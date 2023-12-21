import { useState } from "react";

/**
 * Custom hook for managing state in local storage.
 *
 * @param {string} key - The key for storing data in local storage.
 * @param {T} defaultValue - The default value for the state.
 * @returns {[T, Function]} - A tuple containing the current state and a function to update it.
 */
const useLocalStorage = <T,>(key: string, defaultValue: T): [T, Function] => {
  // Get initial state from local storage or use the default value.
  const [localStorageValue, setLocalStorageValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue) return JSON.parse(storedValue);

      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    } catch (error) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
  });

  /**
   * Update local storage and state based on the provided value or function.
   *
   * @param {T | Function} valueOrFn - The value or function to update the state.
   */
  const setLocalStorageStateValue = (valueOrFn: T | Function) => {
    const newValue = typeof valueOrFn === 'function' ? (valueOrFn as Function)(localStorageValue) : valueOrFn;

    // Update local storage and state with the new value.
    localStorage.setItem(key, JSON.stringify(newValue));
    setLocalStorageValue(newValue);
  };

  return [localStorageValue, setLocalStorageStateValue];
};

export default useLocalStorage;
