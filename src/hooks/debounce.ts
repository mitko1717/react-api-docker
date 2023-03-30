import { useState, useEffect } from "react";

export default function useDebounce<T>(
  callback: (arg: T) => void,
  delay: number
): (arg: T) => void {
  const [value, setValue] = useState<T>({} as T);

  useEffect(() => {
    const handler = setTimeout(() => {
      callback(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return setValue;
}
