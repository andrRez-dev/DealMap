import { useState, useEffect } from "react";
import { getRequestHeaders, readResponse } from "../../../shared/api";
import { type Category } from "../../../shared/types";
import { ChevronDown, Tags } from "lucide-react";

type CategoriesResponse = {
  categories?: Category[];
};

type CategorySelectProps = {
  selectedCategory: string;
  setSelectedCategory: (categoryId: string) => void;
};

export default function CategorySelect({
  selectedCategory,
  setSelectedCategory,
}: CategorySelectProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState("");

  useEffect(() => {
    let isCurrent = true;

    const api = import.meta.env.VITE_API_URL;

    async function loadCatagories(): Promise<void> {
      try {
        if (!api) {
          throw new Error("The API URL is not configured.");
        }

        const response = await fetch(`${api}/api/offers/form`, {
          headers: getRequestHeaders(),
        });
        const data = await readResponse<CategoriesResponse>(
          response,
          "Unable to load categories",
        );

        if (!Array.isArray(data.categories)) {
          throw new Error("The server did not return a list of categories.");
        }

        if (isCurrent) {
          setCategories(data.categories);
          setCategoriesError("");
        }
      } catch (loadError: unknown) {
        if (isCurrent) {
          setCategoriesError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load categories.",
          );
        }
      } finally {
        if (isCurrent) {
          setIsCategoriesLoading(false);
        }
      }
    }

    void loadCatagories();
    return () => {
      isCurrent = false;
    };
  }, []);

  return (
    <div className="w-70 rounded-2xl border border-[#e5ebe2] bg-white p-2 shadow-[0_4px_16px_#263c2a0a]">
      <label
        htmlFor="offer-catregory-filter"
        className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#68766c]"
      >
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#edf4eb] text-green-800">
          <Tags aria-hidden="true" className="h-4 w-4" />
        </span>
        Filter offers by category
      </label>
      <div className="relative">
        <select
          id="offer-category-filter"
          className="w-full truncate appearance-none rounded-xl border border-[#dfe7dc] bg-[#fbfcfa] py-2.5 pl-3 pr-10 text-sm font-medium text-[#26332a] outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-700/15 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={
            isCategoriesLoading ||
            Boolean(categoriesError) ||
            categories.length === 0
          }
          value={selectedCategory}
          onChange={(event) => {
            const categoryId = event.target.value;
            setSelectedCategory(categoryId);

            if (categoryId) {
              localStorage.setItem("selectedCategory", categoryId);
            } else {
              localStorage.removeItem("selectedCategory");
            }
          }}
          aria-describedby={
            categoriesError || isCategoriesLoading || categories.length === 0
              ? "offer-category-filter-help"
              : undefined
          }
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7a857e]"
        />
      </div>
      {(isCategoriesLoading || categoriesError || categories.length === 0) && (
        <p
          id="offer-category-filter-help"
          className={`mt-2 text-xs ${
            categoriesError ? "text-red-700" : "text-[#7a857e]"
          }`}
          role={
            categoriesError
              ? "alert"
              : isCategoriesLoading
                ? "status"
                : undefined
          }
        >
          {isCategoriesLoading
            ? "Loading categories…"
            : categoriesError || "No categories are available."}
        </p>
      )}
    </div>
  );
}
