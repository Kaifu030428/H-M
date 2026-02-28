import { useQuery } from "@tanstack/react-query";
import { getProductByCategory } from "../api/ProductApis";

export const fetchProductDataHook = (category) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery({
    queryKey: [`products-${category}`],
    queryFn: () => getProductByCategory(category),
    staleTime: 30000, // 30 seconds
    retry: 1, // Reduced retries to fail faster
    retryDelay: 500,
    enabled: !!category, // Only run if category is provided
    refetchOnWindowFocus: false, // Don't refetch on window focus to reduce network calls
  });
};