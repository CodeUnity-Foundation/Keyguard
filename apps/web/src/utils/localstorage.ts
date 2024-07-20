export function storeJSON<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getJSON<T>(key: string): T | null {
  const item = localStorage.getItem(key);
  if (item) {
    try {
      return JSON.parse(item);
    } catch (error) {
      return null;
    }
  }
  return null;
}

export function removeItem(key: string): void {
  localStorage.removeItem(key);
}
