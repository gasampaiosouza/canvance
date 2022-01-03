import api from 'services/api';
import useSWR from 'swr';
import { PublicConfiguration, BareFetcher } from 'swr/dist/types';

// `/tasks/category/${userCategory}`,

export function useFetch<T>(
  url: string,
  options?: Partial<PublicConfiguration<T, any, BareFetcher<T>>>
) {
  const { data, error, mutate } = useSWR<T>(
    url,
    async (url: string) => {
      const response = await api.get<T>(url);

      return response.data;
    },
    options
  );

  return { data, error, mutate };
}
