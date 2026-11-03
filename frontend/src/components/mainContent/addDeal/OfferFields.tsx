import type { Store } from "../../shared/types";
import { fieldClassName, labelClassName } from "./formStyles";

type Props = {
  stores: Store[];
  storeId: string;
  onStoreIdChange: (value: string) => void;
  title: string;
  onTitleChange: (value: string) => void;
  expiresAt: string;
  onExpiresAtChange: (value: string) => void;
  today: string;
  maxExpiryDate: string;
  originalPrice: string;
  onOriginalPriceChange: (value: string) => void;
  discountedPrice: string;
  onDiscountedPriceChange: (value: string) => void;
  description: string;
  onDescriptionChange: (value: string) => void;
  isSubmitting: boolean;
};

export default function OfferFields({
  stores,
  storeId,
  onStoreIdChange,
  title,
  onTitleChange,
  expiresAt,
  onExpiresAtChange,
  today,
  maxExpiryDate,
  originalPrice,
  onOriginalPriceChange,
  discountedPrice,
  onDiscountedPriceChange,
  description,
  onDescriptionChange,
  isSubmitting,
}: Props) {
  return (
    <>
      <label className={labelClassName}>
        Store *
        <select
          className={fieldClassName}
          required
          value={storeId}
          onChange={(event) => onStoreIdChange(event.target.value)}
        >
          <option value="">Select a store</option>
          {stores.map((store) => (
            <option key={store.id} value={store.id}>
              {store.name}
              {store.address ? ` — ${store.address}` : ""}
              {store.brand ? ` (${store.brand})` : ""}
            </option>
          ))}
        </select>
        {stores.length === 0 && (
          <span className="mt-1 block text-xs font-normal text-red-700">
            No active stores are available.
          </span>
        )}
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className={labelClassName}>
          Offer title *
          <input
            className={fieldClassName}
            required
            maxLength={200}
            value={title}
            onChange={(event) => onTitleChange(event.target.value)}
          />
        </label>
        <label className={labelClassName}>
          Expires on
          <input
            className={fieldClassName}
            type="date"
            min={today}
            max={maxExpiryDate}
            value={expiresAt}
            onChange={(event) => onExpiresAtChange(event.target.value)}
          />
        </label>
        <label className={labelClassName}>
          Original price *
          <input
            className={fieldClassName}
            type="number"
            required
            min="0.01"
            step="0.01"
            inputMode="decimal"
            value={originalPrice}
            onChange={(event) => onOriginalPriceChange(event.target.value)}
          />
        </label>
        <label className={labelClassName}>
          Discounted price *
          <input
            className={fieldClassName}
            type="number"
            required
            min="0.01"
            step="0.01"
            inputMode="decimal"
            value={discountedPrice}
            onChange={(event) => onDiscountedPriceChange(event.target.value)}
          />
        </label>
      </div>

      <label className={labelClassName}>
        Offer description
        <input
          className={fieldClassName}
          value={description}
          onChange={(event) => onDescriptionChange(event.target.value)}
        />
      </label>

      <button
        type="submit"
        disabled={isSubmitting || !stores.length}
        className="w-full rounded-lg bg-green-700 px-5 py-3 font-semibold text-white transition-colors hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Adding offer…" : "Add offer"}
      </button>
    </>
  );
}
