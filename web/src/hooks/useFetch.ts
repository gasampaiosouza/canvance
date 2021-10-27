import useSWR from 'swr';
import api from 'services/api';

function useFetch<DataType, ErrorType = unknown>(path: string, options?: any) {
  const fetcher = async (url: string) => {
    const response = await api.get<DataType>(url);

    return response.data;
  };

  const response = useSWR<DataType, ErrorType>(path, fetcher, options);

  return response;
}

export default useFetch;
