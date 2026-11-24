<<<<<<< HEAD

import type { Product, ProductDraft } from "../types";
=======
import type { ProductDraft, Product } from "../types";
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
import { type Category } from "../../../shared/types";
import type useProductSearch from "../useProductSearch";
import { fieldClassName, labelClassName } from "../formStyles";

type Props = {
  categories: Category[];
  isNewProduct: boolean;
  onModeChange: (isNewProduct: boolean) => void;
  productDraft: ProductDraft;
  onProductDraftChange: (changes: Partial<ProductDraft>) => void;
  productSearch: ReturnType<typeof useProductSearch>;
  onSelectProduct: (product: Product) => void;
};

export default function ProductFields({
  categories,
  isNewProduct,
  onModeChange,
  productDraft,
  onProductDraftChange,
  productSearch,
  onSelectProduct,
}: Props) {
  return (
    <>
<<<<<<< HEAD
      {/* Product mode */}
      <div className="min-w-0">
        <p className={labelClassName}>Product</p>

        <div className="mt-2 grid grid-cols-1 gap-2 min-[360px]:grid-cols-2 sm:flex sm:flex-wrap">
=======
      <div>
        <p className={labelClassName}>Product</p>
        <div className="mt-2 flex gap-2">
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
          <button
            type="button"
            aria-pressed={!isNewProduct}
            onClick={() => onModeChange(false)}
<<<<<<< HEAD
            className={`min-w-0 rounded-lg px-3 py-2.5 text-center text-sm font-medium transition-colors sm:px-4 ${
=======
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
              !isNewProduct
                ? "bg-green-700 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Find existing
          </button>
<<<<<<< HEAD

=======
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
          <button
            type="button"
            aria-pressed={isNewProduct}
            onClick={() => onModeChange(true)}
<<<<<<< HEAD
            className={`min-w-0 rounded-lg px-3 py-2.5 text-center text-sm font-medium transition-colors sm:px-4 ${
=======
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
              isNewProduct
                ? "bg-green-700 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Create product
          </button>
        </div>
      </div>

      {isNewProduct ? (
<<<<<<< HEAD
        /* New product fields */
        <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
          <label className={`${labelClassName} min-w-0`}>
            Product name *
            <input
              className={`${fieldClassName} w-full min-w-0`}
=======
        <div className="grid gap-4 md:grid-cols-2">
          <label className={labelClassName}>
            Product name *
            <input
              className={fieldClassName}
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
              required
              minLength={3}
              maxLength={40}
              value={productDraft.name}
              onChange={(event) =>
                onProductDraftChange({ name: event.target.value })
              }
            />
          </label>
<<<<<<< HEAD

          <label className={`${labelClassName} min-w-0`}>
            Category *
            <select
              className={`${fieldClassName} w-full min-w-0`}
              required
              value={productDraft.category_id}
              onChange={(event) =>
                onProductDraftChange({
                  category_id: event.target.value,
                })
              }
            >
              <option value="">Select a category</option>

=======
          <label className={labelClassName}>
            Category *
            <select
              className={fieldClassName}
              required
              value={productDraft.category_id}
              onChange={(event) =>
                onProductDraftChange({ category_id: event.target.value })
              }
            >
              <option value="">Select a category</option>
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
<<<<<<< HEAD

=======
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
            {categories.length === 0 && (
              <span className="mt-1 block text-xs font-normal text-red-700">
                No categories are available.
              </span>
            )}
          </label>
<<<<<<< HEAD

          <label className={`${labelClassName} min-w-0`}>
            Barcode
            <input
              className={`${fieldClassName} w-full min-w-0`}
=======
          <label className={labelClassName}>
            Barcode
            <input
              className={fieldClassName}
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
              maxLength={13}
              value={productDraft.barcode}
              onChange={(event) =>
                onProductDraftChange({ barcode: event.target.value })
              }
            />
          </label>
        </div>
      ) : (
<<<<<<< HEAD
        /* Existing product search */
        <div className="w-full min-w-0">
          <label
            className={labelClassName}
            htmlFor="product-search"
          >
            Search products *
          </label>

          <input
            id="product-search"
            className={`${fieldClassName} w-full min-w-0`}
=======
        <div>
          <label className={labelClassName} htmlFor="product-search">
            Search products *
          </label>
          <input
            id="product-search"
            className={fieldClassName}
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
            autoComplete="off"
            minLength={2}
            placeholder="Enter at least 2 characters"
            required={!productSearch.selectedProduct}
            value={productSearch.query}
            onChange={(event) => {
              productSearch.changeQuery(event.target.value);
              onProductDraftChange({ name: "" });
            }}
          />
<<<<<<< HEAD

          {productSearch.isSearching && (
            <p className="mt-2 text-sm text-gray-500">
              Searching products…
            </p>
          )}

          {productSearch.error && (
            <p
              className="mt-2 break-words text-sm text-red-700"
              role="alert"
            >
              {productSearch.error}
            </p>
          )}

          {productSearch.products.length > 0 && (
            <ul
              className="mt-2 max-h-52 w-full min-w-0 overflow-y-auto overflow-x-hidden rounded-lg border border-gray-200"
              aria-label="Product search results"
            >
              {productSearch.products.map((product) => (
                <li key={product.id} className="min-w-0">
                  <button
                    type="button"
                    onClick={() => onSelectProduct(product)}
                    className="w-full min-w-0 break-words px-3 py-2.5 text-left text-sm hover:bg-green-50"
                  >
                    {product.name}

=======
          {productSearch.isSearching && (
            <p className="mt-2 text-sm text-gray-500">Searching products…</p>
          )}
          {productSearch.error && (
            <p className="mt-2 text-sm text-red-700" role="alert">
              {productSearch.error}
            </p>
          )}
          {productSearch.products.length > 0 && (
            <ul
              className="mt-2 max-h-52 overflow-y-auto rounded-lg border border-gray-200"
              aria-label="Product search results"
            >
              {productSearch.products.map((product) => (
                <li key={product.id}>
                  <button
                    type="button"
                    onClick={() => onSelectProduct(product)}
                    className="w-full px-3 py-2.5 text-left text-sm hover:bg-green-50"
                  >
                    {product.name}
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
                    {product.name_lt && (
                      <span className="ml-2 text-gray-500">
                        {product.name_lt}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
<<<<<<< HEAD

=======
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
          {!productSearch.isSearching &&
            !productSearch.error &&
            productSearch.query.trim().length >= 2 &&
            !productSearch.selectedProduct &&
            productSearch.products.length === 0 && (
<<<<<<< HEAD
              <p className="mt-2 break-words text-sm text-gray-500">
                No products found. You can add a new product.
              </p>
            )}

          {productSearch.selectedProduct && (
            <p
              className="mt-2 break-words text-sm text-green-800"
              role="status"
            >
=======
              <p className="mt-2 text-sm text-gray-500">
                No products found. You can add a new product.
              </p>
            )}
          {productSearch.selectedProduct && (
            <p className="mt-2 text-sm text-green-800" role="status">
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
              Selected product: {productSearch.selectedProduct.name} (
              {productSearch.selectedProduct.unit})
            </p>
          )}
        </div>
      )}

<<<<<<< HEAD
      {/* Product unit */}
      {isNewProduct && (
        <fieldset className="min-w-0">
          <legend className={labelClassName}>Unit *</legend>

          <div
            className="mt-2 flex min-w-0 flex-wrap gap-2"
            role="group"
            aria-label="Unit"
          >
=======
      {isNewProduct && (
        <fieldset>
          <legend className={labelClassName}>Unit *</legend>
          <div className="mt-2 flex gap-2" role="group" aria-label="Unit">
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
            {[
              ["kg", "Kilogram"],
              ["l", "Liter"],
              ["vnt", "Piece"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={productDraft.unit === value}
<<<<<<< HEAD
                onClick={() =>
                  onProductDraftChange({ unit: value })
                }
                className={`min-w-0 flex-1 rounded-lg border px-3 py-2.5 text-center text-sm font-medium transition-colors sm:flex-none sm:px-4 ${
=======
                onClick={() => onProductDraftChange({ unit: value })}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
                  productDraft.unit === value
                    ? "border-green-700 bg-green-700 text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {label} ({value})
              </button>
            ))}
          </div>
        </fieldset>
      )}
    </>
  );
}
