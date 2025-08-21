import { useState, useEffect } from 'react';

export function useLoader(initialDelay: number = 1500) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, initialDelay);

    return () => clearTimeout(timer);
  }, [initialDelay]);

  return { isLoading, setIsLoading };
}
