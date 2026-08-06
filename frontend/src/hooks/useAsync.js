import { useEffect, useState } from "react";

/* oxlint-disable react/exhaustive-deps -- deps are passed explicitly by callers */

export function useAsync(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isActive = true;

    setIsLoading(true);
    fetcher()
      .then((result) => {
        if (isActive) {
          setData(result);
          setError(null);
        }
      })
      .catch((err) => {
        if (isActive) setError(err);
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, deps);

  return { data, isLoading, error };
}

