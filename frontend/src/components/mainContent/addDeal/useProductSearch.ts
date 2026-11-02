import { useEffect, useState } from "react";
import { getRequestHeaders, readResponse } from "./api";
import type { Product } from "./types";

type ProductsResponse = {
  products?: Product[];
};

export default function useProductSearch(api: string | undefined) {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [error, setError] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const searchQuery = query.trim();

    if (selectedProduct || searchQuery.length < 2) {
      return;
    }

    let isCurrent = true;
    const timeout = window.setTimeout(async () => {
      try {
        if (!api) {
          throw new Error("The API URL is not configured.");
        }

        setIsSearching(true);
        setError("");
        const response = await fetch(
          `${api}/api/products/search?q=${encodeURIComponent(searchQuery)}`,
          { headers: getRequestHeaders() },
        );
        const data = await readResponse<ProductsResponse>(
          response,
          "Unable to search products",
        );

        if (!Array.isArray(data.products)) {
          throw new Error("The server did not return a list of products.");
        }

        if (isCurrent) {
          setProducts(data.products);
        }
      } catch (searchError: unknown) {
        if (isCurrent) {
          setProducts([]);
          setError(
            searchError instanceof Error
              ? searchError.message
              : "Unable to search products.",
          );
        }
      } finally {
        if (isCurrent) {
          setIsSearching(false);
        }
      }
    }, 300);

    return () => {
      isCurrent = false;
      window.clearTimeout(timeout);
    };
  }, [api, query, selectedProduct]);

  function changeQuery(value: string): void {
    setQuery(value);
    setSelectedProduct(null);
    setProducts([]);
    setError("");
    setIsSearching(false);
  }

  function selectProduct(product: Product): void {
    setSelectedProduct(product);
    setQuery(product.name);
    setProducts([]);
    setError("");
  }

  function reset(): void {
    setQuery("");
    setProducts([]);
    setSelectedProduct(null);
    setError("");
    setIsSearching(false);
  }

  return {
    query,
    products,
    selectedProduct,
    error,
    isSearching,
    changeQuery,
    selectProduct,
    reset,
  };
}
