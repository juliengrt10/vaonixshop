/**
 * Helper pour gérer l'état des filtres dans l'URL
 */
export const toggleParamMulti = (params: URLSearchParams, key: string, value: string) => {
  const set = new Set((params.get(key)?.split(",") ?? []).filter(Boolean));
  set.has(value) ? set.delete(value) : set.add(value);
  set.size ? params.set(key, Array.from(set).join(",")) : params.delete(key);
  params.set("page", "1");
  return params;
};

export const getParamArray = (params: URLSearchParams, key: string): string[] => {
  return params.get(key)?.split(",").filter(Boolean) ?? [];
};

export const setParamArray = (params: URLSearchParams, key: string, values: string[]) => {
  if (values.length > 0) {
    params.set(key, values.join(","));
  } else {
    params.delete(key);
  }
  params.set("page", "1");
  return params;
};