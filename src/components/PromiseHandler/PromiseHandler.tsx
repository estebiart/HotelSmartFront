import { useState, useEffect, ReactNode, SetStateAction } from 'react';

type PromiseFunction<T> = () => Promise<T>;
type PromiseHandlerProps<T> = {
  promise: PromiseFunction<T>;
  children: (data: T) => ReactNode;
};

const PromiseHandler = <T,>({ promise, children }: PromiseHandlerProps<T>) => {
  const [data, setData] = useState<T | null>(null); 
  const [error, setError] = useState<any>(null); 
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await promise();
        setData(result);
      } catch (error) {
        setError(error); 
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [promise]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>; 
  }

  return children(data as T); 
};

export default PromiseHandler;
