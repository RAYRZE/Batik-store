import { useEffect, useState } from "react";

/* oxlint-disable react/exhaustive-deps -- deps are passed explicitly by callers */

export function useAsync(fetcher, deps = [], { enabled = true, initialData = null } = {}) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(enabled);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!enabled) {
      setError(null);
      setIsLoading(false);
      return;
    }

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
  }, [...deps, enabled]);

  return { data, isLoading, error };
}
