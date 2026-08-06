import { useAsync } from "./useAsync";
import { fetchProduct } from "../services/product";

export function useProduct(id) {
  const { data, isLoading, error } = useAsync(() => fetchProduct(id), [id]);

  return { product: data, isLoading, error };
}
