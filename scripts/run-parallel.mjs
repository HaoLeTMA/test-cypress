// Starts several Cypress runners that share one ci-build-id, so Cypress Cloud load-balances the specs
// between them like separate CI machines.
// Usage: npm run test:parallel [-- <ci-build-id>]   (runner count: PARALLEL_RUNNERS, default 2)
import { spawn } from 'node:child_process'

const DEFAULT_RUNNERS = 2
const CYPRESS_BIN = 'node_modules/cypress/bin/cypress'

const runnerCount = Number(process.env.PARALLEL_RUNNERS ?? DEFAULT_RUNNERS)
const ciBuildId = process.argv[2] ?? `local-${new Date().toISOString().replace(/[:.]/g, '-')}`

console.log(`ci-build-id: ${ciBuildId} | runners: ${runnerCount}`)

const pipeWithPrefix = (stream, prefix, target) => {
  let pending = ''
  stream.on('data', (chunk) => {
    const lines = (pending + chunk.toString()).split('\n')
    pending = lines.pop()
    for (const line of lines) target.write(`${prefix} ${line}\n`)
  })
  stream.on('end', () => {
    if (pending) target.write(`${prefix} ${pending}\n`)
  })
}

const startRunner = (index) =>
  new Promise((resolve) => {
    const prefix = `[runner ${index + 1}]`
    const child = spawn(
      process.execPath,
      [CYPRESS_BIN, 'run', '--component', '--record', '--parallel', '--ci-build-id', ciBuildId],
      {
        stdio: ['ignore', 'pipe', 'pipe'],
        env: { ...process.env, VITE_CACHE_DIR: `node_modules/.vite-runner-${index + 1}` },
      },
    )
    pipeWithPrefix(child.stdout, prefix, process.stdout)
    pipeWithPrefix(child.stderr, prefix, process.stderr)
    child.on('close', (code) => resolve(code ?? 1))
  })

const exitCodes = await Promise.all(Array.from({ length: runnerCount }, (_, index) => startRunner(index)))
console.log(`exit codes: ${exitCodes.join(', ')}`)
process.exit(exitCodes.some((code) => code !== 0) ? 1 : 0)
