<<<<<<< HEAD

=======
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
import type { Store } from "../../../shared/types";
import { fieldClassName, labelClassName } from "../formStyles";

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
<<<<<<< HEAD
      {/* Store selection */}
      <label className={`${labelClassName} block min-w-0`}>
        Store *
        <select
          className={`${fieldClassName} block w-full min-w-0 max-w-full`}
=======
      <label className={labelClassName}>
        Store *
        <select
          className={fieldClassName}
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
          required
          value={storeId}
          onChange={(event) => onStoreIdChange(event.target.value)}
        >
          <option value="">Select a store</option>
<<<<<<< HEAD

=======
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
          {stores.map((store) => (
            <option key={store.id} value={store.id}>
              {store.name}
              {store.address ? ` — ${store.address}` : ""}
              {store.brand ? ` (${store.brand})` : ""}
            </option>
          ))}
        </select>
<<<<<<< HEAD

        {stores.length === 0 && (
          <span className="mt-1 block break-words text-xs font-normal text-red-700">
=======
        {stores.length === 0 && (
          <span className="mt-1 block text-xs font-normal text-red-700">
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
            No active stores are available.
          </span>
        )}
      </label>

<<<<<<< HEAD
      {/* Offer details */}
      <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
        <label className={`${labelClassName} block min-w-0`}>
          Offer title *
          <input
            className={`${fieldClassName} block w-full min-w-0`}
=======
      <div className="grid gap-4 md:grid-cols-2">
        <label className={labelClassName}>
          Offer title *
          <input
            className={fieldClassName}
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
            required
            maxLength={200}
            value={title}
            onChange={(event) => onTitleChange(event.target.value)}
          />
        </label>
<<<<<<< HEAD

        <label className={`${labelClassName} block min-w-0`}>
          Expires on
          <input
            className={`${fieldClassName} block w-full min-w-0 max-w-full`}
=======
        <label className={labelClassName}>
          Expires on
          <input
            className={fieldClassName}
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
            type="date"
            min={today}
            max={maxExpiryDate}
            value={expiresAt}
            onChange={(event) => onExpiresAtChange(event.target.value)}
          />
        </label>
<<<<<<< HEAD

        <label className={`${labelClassName} block min-w-0`}>
          Original price *
          <input
            className={`${fieldClassName} block w-full min-w-0`}
=======
        <label className={labelClassName}>
          Original price *
          <input
            className={fieldClassName}
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
            type="number"
            required
            min="0.01"
            step="0.01"
            inputMode="decimal"
            value={originalPrice}
<<<<<<< HEAD
            onChange={(event) =>
              onOriginalPriceChange(event.target.value)
            }
          />
        </label>

        <label className={`${labelClassName} block min-w-0`}>
          Discounted price *
          <input
            className={`${fieldClassName} block w-full min-w-0`}
=======
            onChange={(event) => onOriginalPriceChange(event.target.value)}
          />
        </label>
        <label className={labelClassName}>
          Discounted price *
          <input
            className={fieldClassName}
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
            type="number"
            required
            min="0.01"
            step="0.01"
            inputMode="decimal"
            value={discountedPrice}
<<<<<<< HEAD
            onChange={(event) =>
              onDiscountedPriceChange(event.target.value)
            }
=======
            onChange={(event) => onDiscountedPriceChange(event.target.value)}
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
          />
        </label>
      </div>

<<<<<<< HEAD
      {/* Description */}
      <label className={`${labelClassName} block min-w-0`}>
        Offer description
        <input
          className={`${fieldClassName} block w-full min-w-0`}
          value={description}
          onChange={(event) =>
            onDescriptionChange(event.target.value)
          }
        />
      </label>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting || !stores.length}
        className="w-full min-w-0 rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
=======
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
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
      >
        {isSubmitting ? "Adding offer…" : "Add offer"}
      </button>
    </>
  );
}
