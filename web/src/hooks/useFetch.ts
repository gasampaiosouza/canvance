import useSWR from 'swr';
import api from 'services/api';

function useFetch<DataType, ErrorType = unknown>(path: string, options?: any) {
  const { data, error } = useSWR<DataType, ErrorType>(
    path,
    async (url) => {
      const response = await api.get(url);

      return response.data;
    },
    options
  );

  return { data, error };
}

export default useFetch;
