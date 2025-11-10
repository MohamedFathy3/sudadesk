// hooks/useApiMutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from "@/lib/api";
import toast from 'react-hot-toast';

interface MutationOptions {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  successMessage?: string;
  errorMessage?: string;
}

export function useApiMutation(endpoint: string, options: MutationOptions = {}) {
  const queryClient = useQueryClient();

  return useMutation({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: async (data: any) => {
      const response = await apiFetch(endpoint, {
        method: "POST",
        body: JSON.stringify(data)
      });
      return response;
    },
    onSuccess: (data) => {
      if (options.successMessage) {
        toast.success(options.successMessage);
      }
      if (options.onSuccess) {
        options.onSuccess(data);
      }
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: [endpoint.split('/')[0]] });
    },
    onError: (error: Error) => {
      if (options.errorMessage) {
        toast.error(options.errorMessage);
      } else {
        toast.error(error.message || 'Operation failed');
      }
      if (options.onError) {
        options.onError(error);
      }
    }
  });
}