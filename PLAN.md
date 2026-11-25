# Plan: Product CRUD sandbox cho Cypress Cloud

Mục tiêu: app React nhỏ (CRUD sản phẩm) theo cấu trúc feature-based như iCare, khoảng 20 Cypress component test
(gồm test component, util, schema và page), chạy local rồi record lên Cypress Cloud.

Quy ước: code, tên test, comment viết tiếng Anh; doc viết tiếng Việt. Test theo skill `component-test`
(AAA, mount inline trong từng `it`, `<X /> - when <scenario>` / `should <behavior>`, `i18n.t`, `data-cy`,
StaticResponse overrides). Cấu trúc theo skill `feature-structure`.

## Stack (version lấy theo package.json của iCare)

- dependencies: `react ^18.2.0`, `react-dom ^18.2.0`, `react-router-dom ^7.18.2`, `@mui/material ^5.15.10`,
  `@mui/icons-material ^5.14.13`, `@emotion/react ^11.11.1`, `@emotion/styled ^11.11.0`,
  `@reduxjs/toolkit ^2.2.3`, `react-redux ^9.1.2`, `react-hook-form 7.51.5`, `@hookform/resolvers ^3.9.1`,
  `zod ^3.23.8`, `i18next ^23.7.15`, `react-i18next ^14.0.0`
- devDependencies: `cypress ^15.17.0`, `vite ^8.3.5`, `@vitejs/plugin-react ^6.0.2`, `typescript ^5.2.2`,
  `@types/react ^18.2.21`, `@types/react-dom ^18.2.7`, `@types/node ^24.1.0`, `prettier ^3.0.3`
- Không có backend: app gọi `/api/products...` qua RTK Query, mọi test dùng `cy.intercept`.
- i18n nạp tĩnh từ `src/locales/en.json` (không dùng http backend để test ổn định).

## Cấu trúc

```
src/
├── main.tsx, App.tsx                 App.tsx: routes /products, /products/create, /products/:id/edit
├── components/Layouts/index.tsx      app shell (AppBar + Outlet) + hidden data-cy="current-path"
├── constants/Product.ts              CATEGORY_OPTIONS (dữ liệu tham chiếu hệ thống)
├── interfaces/Product.ts             IProduct, IProductListParams, IProductRequest (API contract)
├── locales/en.json                   TẤT CẢ key i18n (định nghĩa sẵn ở Phase 0)
├── store/index.ts                    configureStore + makeStore(preloaded) cho test
├── store/apis/baseApi.ts             createApi, baseUrl '/api', tagTypes ['Product']
├── store/apis/Product.ts             getProducts, getProductDetails, createProduct, updateProduct, deleteProduct
├── utils/languages.ts                export default i18n
├── utils/index.ts                    getApiErrorMessage
├── pages/Product/
│   ├── SearchProduct.tsx
│   ├── CreateProduct.tsx
│   └── EditProduct.tsx
└── features/Product/
    ├── Common/ProductForm.tsx        form dùng chung Create + Edit (name, price, category, stock, Save, Cancel)
    ├── interfaces/Product.ts         IProductFormValues, IProductSearchFilter
    ├── validations/productSchema.ts  createProductSchema(t)
    ├── constants.ts                  DEFAULT_PRODUCT_FORM_VALUES, PRODUCT_PATHS
    ├── util.ts                       formatPrice, toProductFormValues, toProductRequest
    ├── Search/
    │   ├── ProductSearchBar.tsx      ô tìm keyword + select category
    │   ├── ProductTable.tsx          bảng + empty state + nút Edit/Delete mỗi dòng
    │   ├── DeleteProductDialog.tsx   dialog xác nhận xoá
    │   ├── hooks/useProductSearch.ts
    │   ├── hooks/useDeleteProduct.ts
    │   └── constants.ts              DEFAULT_SEARCH_FILTER
    ├── Create/hooks/useCreateProduct.ts
    └── Edit/hooks/useEditProduct.ts

src/__test__/
├── components/index.tsx              mountWithProviders(ui, { route }) : theme + store + MemoryRouter
├── features/Product/
│   ├── index.tsx                     setupProductInterceptors(overrides), mountProductPage(path, overrides),
│   │                                 expectCurrentPath(path), serverError(message)
│   ├── fixtures.ts                   typed IProduct / IProductFormValues dùng cho util + schema test
│   ├── util.cy.ts
│   ├── validations/productSchema.cy.ts
│   ├── Common/ProductForm.cy.tsx
│   └── Search/{ProductSearchBar,ProductTable,DeleteProductDialog}.cy.tsx
└── pages/Product/{SearchProduct,CreateProduct,EditProduct}.cy.tsx

cypress/fixtures/product/
├── products.json, products-empty.json
├── product-details.json
├── create-product.json, update-product.json, delete-product.json
```

## Hành vi app (spec chung cho mọi agent)

- `/products`: tiêu đề, ô tìm + select category (lọc phía server qua query `keyword`, `category`), bảng
  (Name, Category, Price dạng `$1,299.00`, Stock, nút Edit/Delete). Rỗng -> "No products found". Lỗi load ->
  Alert lỗi. Nút "Create product" -> `/products/create`. Delete -> dialog có tên sản phẩm -> Confirm gọi
  DELETE, đóng dialog, hiện snackbar "Product deleted"; Cancel đóng dialog.
- `/products/create`: ProductForm rỗng. Save hợp lệ -> POST body đúng giá trị đã nhập -> về `/products` +
  snackbar "Product created". Lỗi server -> Alert message từ server, ở lại trang. Cancel -> `/products`.
- `/products/:id/edit`: load chi tiết -> fill form. Save -> PUT -> về `/products` + snackbar "Product updated".
  Load lỗi 404 -> về `/products`.
- Schema: name bắt buộc, 3-50 ký tự; price > 0; stock là số nguyên >= 0; category thuộc CATEGORY_OPTIONS.
- `data-cy` theo mẫu `product-<element>-<role>` (vd `product-form-name-field`, `product-table-row`,
  `product-delete-dialog-confirm-button`).

## Danh sách test (20)

| File | Số test | Agent |
|---|---|---|
| `features/Product/util.cy.ts` | 2 | B |
| `features/Product/validations/productSchema.cy.ts` | 3 | B |
| `features/Product/Common/ProductForm.cy.tsx` | 2 | B |
| `features/Product/Search/ProductTable.cy.tsx` | 2 | C |
| `features/Product/Search/ProductSearchBar.cy.tsx` | 2 | C |
| `features/Product/Search/DeleteProductDialog.cy.tsx` | 2 | C |
| `pages/Product/SearchProduct.cy.tsx` | 3 | C |
| `pages/Product/CreateProduct.cy.tsx` | 2 | D |
| `pages/Product/EditProduct.cy.tsx` | 2 | E |

## Các phase

### Phase 0 - Nền (main agent, tuần tự)

Mọi file dùng chung, để các agent ở Phase 1 không sửa cùng một file:
package.json + `npm install`, `vite.config.ts`, `tsconfig.json` (alias `@features @pages @components
@constants @interfaces @store @utils @test`), `cypress.config.ts` (component, vite, `projectId` từ env),
`cypress/support/component.tsx`, `.prettierrc`, `.gitignore`, `.env.example`; toàn bộ `src/` ở tầng shared
(store, apis, interfaces, constants, utils, locales đủ key, Layouts, App routes);
feature-level: `interfaces/`, `validations/productSchema.ts`, `constants.ts`, `util.ts`, `Common/ProductForm.tsx`;
3 page file dạng stub; test infra `@test/components`, `@test/features/Product/index.tsx`, `fixtures.ts`
và toàn bộ JSON fixture. Kết thúc: `tsc --noEmit` sạch + 1 smoke spec mount được.

### Phase 1 - Song song (4 subagent, file không chồng nhau)

| Agent | Phạm vi được sửa | Việc |
|---|---|---|
| B - Shared tests | `src/__test__/features/Product/{util.cy.ts,validations/,Common/}` | 7 test cho util, schema, ProductForm (chỉ viết test) |
| C - Search | `features/Product/Search/**`, `pages/Product/SearchProduct.tsx`, test Search + page Search | code + 9 test |
| D - Create | `features/Product/Create/**`, `pages/Product/CreateProduct.tsx`, `pages/Product/CreateProduct.cy.tsx` | code + 2 test |
| E - Edit | `features/Product/Edit/**`, `pages/Product/EditProduct.tsx`, `pages/Product/EditProduct.cy.tsx` | code + 2 test |

Luật chung cho subagent: không sửa file ngoài phạm vi; cần key i18n, fixture hay override mới thì ghi vào
report để main agent thêm; chạy `check-test-style.mjs`, `tsc` và spec của mình; report số test pass/fail thật.

### Phase 2 - Gộp và Cloud (main agent)

1. `tsc --noEmit`, `prettier --check`, `check-test-style.mjs` trên toàn bộ spec, `cypress run --component` (20/20).
2. Tạo project trên cloud.cypress.io -> điền `CYPRESS_PROJECT_ID`, `CYPRESS_RECORD_KEY` vào `.env`.
3. `npm run test:record` (= `cypress run --component --record`), xem run trên Cloud.
4. Thử load-balancing: 2 terminal cùng chạy `cypress run --component --record --parallel --ci-build-id <id>`.
5. README ngắn: cách chạy local, record, parallel.
