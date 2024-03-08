type JSONObject = Record<string, any>;

export function storeJSON(key: string, value: JSONObject): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getJSON(key: string): JSONObject | null {
  const item = localStorage.getItem(key);
  if (item) {
    try {
      return JSON.parse(item);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  }
  return null;
}
