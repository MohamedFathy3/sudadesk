// hooks/useApiData.ts
import { useQuery } from '@tanstack/react-query';
import { apiFetch } from "@/lib/api";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useApiData<T>(endpoint: string, payload?: any) {
  return useQuery<T[]>({
    queryKey: [endpoint, payload],
    queryFn: async (): Promise<T[]> => {
      const response = await apiFetch(`${endpoint}/index`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload || {
          paginate: false,
          perPage: 100
        })
      });

      if (response && Array.isArray(response.data)) {
        return response.data;
      }
      if (Array.isArray(response)) {
        return response;
      }
      return [];
    },
    staleTime: 5 * 60 * 1000,
  });
}