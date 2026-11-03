import { useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { getRequestHeaders, readResponse } from "../shared/api";
import type { Store } from "../shared/types";
import OfferFields from "./addDeal/OfferFields";
import ProductFields from "./addDeal/ProductFields";
import useProductSearch from "./addDeal/useProductSearch";
import type { Category, Product, ProductDraft } from "./addDeal/types";

type StoresResponse = {
  stores?: Store[];
};

type CategoriesResponse = {
  categories?: Category[];
};

type CreateOfferResponse = {
  message?: string;
};

function emptyProductDraft(): ProductDraft {
  return {
    category_id: "",
    name: "",
    unit: "kg",
    barcode: "",
  };
}

function getToday(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getDateAfterDays(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function AddDealContent() {
  const [searchParams] = useSearchParams();
  const preferredStoreId = searchParams.get("store");
  const [stores, setStores] = useState<Store[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingForm, setIsLoadingForm] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isNewProduct, setIsNewProduct] = useState(false);
  const productSearch = useProductSearch(import.meta.env.VITE_API_URL);

  const [storeId, setStoreId] = useState("");
  const [productDraft, setProductDraft] =
    useState<ProductDraft>(emptyProductDraft);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [expiresAt, setExpiresAt] = useState("");

  const api = import.meta.env.VITE_API_URL;

  useEffect(() => {
    let isCurrent = true;

    async function loadFormData(): Promise<void> {
      try {
        if (!api) {
          throw new Error("The API URL is not configured.");
        }

        const headers = getRequestHeaders();
        const [storesResponse, formResponse] = await Promise.all([
          fetch(`${api}/api/stores/get`, { headers }),
          fetch(`${api}/api/offers/form`, { headers }),
        ]);
        const storesData = await readResponse<StoresResponse>(
          storesResponse,
          "Unable to load stores",
        );
        const categoriesData = await readResponse<CategoriesResponse>(
          formResponse,
          "Unable to load categories",
        );

        if (!Array.isArray(storesData.stores)) {
          throw new Error("The server did not return a list of stores.");
        }
        if (!Array.isArray(categoriesData.categories)) {
          throw new Error("The server did not return a list of categories.");
        }

        if (isCurrent) {
          const activeStores = storesData.stores.filter(
            (store) => store.is_active,
          );
          setStores(activeStores);
          if (activeStores.some((store) => store.id === preferredStoreId)) {
            setStoreId(preferredStoreId ?? "");
          }
          setCategories(
            categoriesData.categories.toSorted(
              (first, second) =>
                Number(first.sort_order) - Number(second.sort_order),
            ),
          );
        }
      } catch (loadError: unknown) {
        if (isCurrent) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load form data.",
          );
        }
      } finally {
        if (isCurrent) {
          setIsLoadingForm(false);
        }
      }
    }

    void loadFormData();
    return () => {
      isCurrent = false;
    };
  }, [api, preferredStoreId]);

  function chooseProduct(product: Product): void {
    productSearch.selectProduct(product);
    setTitle(product.name);
    setError("");
  }

  function changeProductMode(newProduct: boolean): void {
    if (newProduct === isNewProduct) {
      return;
    }

    setIsNewProduct(newProduct);
    productSearch.reset();
    setProductDraft((draft) => ({
      ...emptyProductDraft(),
      unit: draft.unit,
    }));
    setError("");
    setSuccess("");
  }

  async function submitOffer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!api) {
      setError("The API URL is not configured.");
      return;
    }

    if (!isNewProduct && !productSearch.selectedProduct) {
      setError("Select an existing product or add a new one.");
      return;
    }

    const original = Number(originalPrice);
    const discounted = Number(discountedPrice);
    const validPrice = (value: string, number: number) =>
      /^\d+(?:\.\d{1,2})?$/.test(value) &&
      Number.isFinite(number) &&
      number > 0;

    if (
      !validPrice(originalPrice, original) ||
      !validPrice(discountedPrice, discounted)
    ) {
      setError(
        "Enter both prices as positive numbers with no more than two decimal places.",
      );
      return;
    }

    if (discounted >= original) {
      setError("The discounted price must be lower than the original price.");
      return;
    }

    if (isNewProduct && productDraft.name.trim().length < 3) {
      setError("Product names must contain at least 3 characters.");
      return;
    }

    if (isNewProduct && !productDraft.category_id) {
      setError("Select a product category.");
      return;
    }

    const discountPercent = Math.max(
      1,
      Math.round(((original - discounted) / original) * 100),
    );
    const product = productSearch.selectedProduct
      ? {
          exists: true,
          id: productSearch.selectedProduct.id,
        }
      : {
          exists: false,
          category_id: productDraft.category_id,
          name: productDraft.name.trim(),
          unit: productDraft.unit,
          ...(productDraft.barcode.trim()
            ? { barcode: productDraft.barcode.trim() }
            : {}),
        };

    const body = {
      product,
      store_id: storeId,
      title: title.trim(),
      description: description.trim() || null,
      starts_at: getToday(),
      expires_at: expiresAt || null,
      original_price: original.toFixed(2),
      discounted_price: discounted.toFixed(2),
      discount_percent: discountPercent,
    };

    setIsSubmitting(true);

    try {
      const response = await fetch(`${api}/api/offers/create`, {
        method: "POST",
        headers: getRequestHeaders(),
        body: JSON.stringify(body),
      });
      const data = await readResponse<CreateOfferResponse>(
        response,
        "Unable to create offer",
      );

      setSuccess(data.message || "Offer added successfully.");
      setStoreId("");
      productSearch.reset();
      setProductDraft((draft) => ({
        ...emptyProductDraft(),
        category_id: draft.category_id,
        unit: draft.unit,
      }));
      setTitle("");
      setDescription("");
      setOriginalPrice("");
      setDiscountedPrice("");
      setExpiresAt("");
    } catch (submitError: unknown) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to create offer.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="h-full flex-1 overflow-y-auto px-5 py-6 md:px-8 md:py-7">
      <div className="mx-auto w-full max-w-3xl rounded-2xl bg-white p-5 shadow-sm md:p-8">
        <h2 className="text-xl font-semibold text-[#26332a]">Add an offer</h2>
        <p className="mt-1 text-sm text-gray-500">
          Add a product, store, and discounted price.
        </p>

        {error && (
          <p
            className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            role="alert"
          >
            {error}
          </p>
        )}
        {success && (
          <p
            className="mt-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
            role="status"
          >
            {success}
          </p>
        )}

        {isLoadingForm ? (
          <p className="mt-6 text-sm text-gray-500">Loading form data…</p>
        ) : (
          <form className="mt-6 space-y-6" onSubmit={submitOffer}>
            <fieldset disabled={isSubmitting} className="space-y-6">
              <ProductFields
                categories={categories}
                isNewProduct={isNewProduct}
                onModeChange={changeProductMode}
                productSearch={productSearch}
                productDraft={productDraft}
                onProductDraftChange={(changes) => {
                  setProductDraft((draft) => ({ ...draft, ...changes }));
                  if (changes.name !== undefined) {
                    setTitle(changes.name);
                  }
                }}
                onSelectProduct={chooseProduct}
              />
              <OfferFields
                stores={stores}
                storeId={storeId}
                onStoreIdChange={setStoreId}
                title={title}
                onTitleChange={setTitle}
                expiresAt={expiresAt}
                onExpiresAtChange={setExpiresAt}
                today={getToday()}
                maxExpiryDate={getDateAfterDays(30)}
                originalPrice={originalPrice}
                onOriginalPriceChange={setOriginalPrice}
                discountedPrice={discountedPrice}
                onDiscountedPriceChange={setDiscountedPrice}
                description={description}
                onDescriptionChange={setDescription}
                isSubmitting={isSubmitting}
              />
            </fieldset>
          </form>
        )}
      </div>
    </section>
  );
}
