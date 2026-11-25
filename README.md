# Product CRUD - Cypress Cloud sandbox

App React nhỏ (CRUD sản phẩm) theo cấu trúc feature-based, có 20 Cypress component test (component, util,
schema, page). Không có backend: mọi API trong test đều được `cy.intercept`. Plan chi tiết: [PLAN.md](PLAN.md).

## Chạy local

```powershell
npm install
npm test            # cypress run --component (20 test)
npm run cy:open     # mở Cypress UI
npm run typecheck
```

`npm run dev` mở được UI nhưng không có API thật nên các request sẽ lỗi; project này chỉ để chạy test.

## Record lên Cypress Cloud

1. Vào https://cloud.cypress.io -> tạo project mới -> lấy **Project ID** và **Record key**
   (Project settings).
2. Copy `.env.example` thành `.env` rồi điền:

   ```
   CYPRESS_PROJECT_ID=abc123
   CYPRESS_RECORD_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   ```

   Các script dùng `node --env-file-if-exists=.env` nên đọc được `.env` cả trên Windows, không cần set biến
   môi trường bằng tay. `.env` đã có trong `.gitignore`.
3. Record một run:

   ```powershell
   npm run test:record
   ```

   Link của run được in ở cuối output (`Recorded Run: https://cloud.cypress.io/...`).

## Thử chạy song song (load balancing) trên Cloud

```powershell
npm run test:parallel
```

Script [scripts/run-parallel.mjs](scripts/run-parallel.mjs) tự tạo một `ci-build-id` (`local-<thời gian>`) rồi
mở 2 runner Cypress dùng chung ID đó, giống 2 máy CI. Cloud chia spec cho từng runner, log mỗi runner có
prefix `[runner 1]` / `[runner 2]`.

- Đổi số runner: `$env:PARALLEL_RUNNERS=3; npm run test:parallel`
- Tự đặt ID: `npm run test:parallel -- my-build-1`. Mỗi lần chạy phải dùng ID mới, vì Cloud coi các run
  có cùng ID là một build.
- Không nên quá 2-3 runner trên một máy: nhiều Cypress chạy cùng lúc dễ bị treo.

## Cấu trúc

```
src/features/Product/   Search/, Create/, Edit/, Common/ProductForm, validations/, util.ts, constants.ts
src/pages/Product/      SearchProduct, CreateProduct, EditProduct
src/__test__/           cùng cây thư mục với src (features/Product/**, pages/Product/**)
cypress/fixtures/product/  response JSON cho intercept
```

## Lưu ý khi chạy từ terminal của VS Code extension

Nếu `cypress run` thoát ngay mà không in gì (exit code `0xC000001D`), xoá biến `ELECTRON_RUN_AS_NODE`:
`Remove-Item Env:ELECTRON_RUN_AS_NODE` (PowerShell) hoặc `unset ELECTRON_RUN_AS_NODE` (bash).
