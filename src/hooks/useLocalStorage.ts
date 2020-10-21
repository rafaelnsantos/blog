import { useState } from 'react';

export function useLocalStorage<T>(key: string, defaultValue: T): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return defaultValue;

    const variable = window.localStorage.getItem(key);
    if (variable) {
      return JSON.parse(variable);
    }
    window.localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  });

  const setter = (value: T) => {
    setValue(value);
    if (typeof window !== 'undefined') window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [value, setter];
}
