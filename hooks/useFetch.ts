import { useEffect, useState } from "react";

export interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useFetch<T>(fetchFn: () => Promise<T>) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true; 
    const fetchData = async () => {
      try {
        const data = await fetchFn();
        if (isMounted) setState({ data, loading: false, error: null });
      } catch (err) {
        if (isMounted)
          setState({
            data: null,
            loading: false,
            error: (err as Error).message || "Failed to fetch data",
          });
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);
  

  return state;
}

