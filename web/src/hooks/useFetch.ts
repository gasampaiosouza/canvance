import api from 'services/api';
import useSWR from 'swr';

// `/tasks/category/${userCategory}`,

export function useFetch<T>(url: string) {
  const { data, error, mutate } = useSWR<T>(url, async (url: string) => {
    const response = await api.get<T>(url);

    return response.data;
  });

  return { data, error, mutate };
}
