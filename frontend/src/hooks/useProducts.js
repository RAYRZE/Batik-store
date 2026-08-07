import { useAsync } from "./useAsync";
import { fetchProducts } from "../services/product";

export function useProducts(
  { search = "", category = "" } = {},
  options = {},
) {
  const { data, isLoading, error } = useAsync(
    () => fetchProducts({ search, category }),
    [search, category],
    options,
  );

  return { products: data ?? [], isLoading, error };
}
