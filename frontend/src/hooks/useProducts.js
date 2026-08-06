import { useAsync } from "./useAsync";
import { fetchProducts } from "../services/product";

export function useProducts({ search = "", category = "" } = {}) {
  const { data, isLoading, error } = useAsync(
    () => fetchProducts({ search, category }),
    [search, category],
  );

  return { products: data ?? [], isLoading, error };
}
