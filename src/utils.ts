export function objectToFlatMapDeep(
  obj: object,
  currentPath = "",
  isFinal?: (v: any) => boolean
) {
  const result: Array<{ path: string; value: any }> = [];

  Object.keys(obj).forEach(key => {
    const val = obj[key];
    const childPath = `${currentPath}${key}`;

    if (isFinal && isFinal(val)) {
      result.push({ path: `${childPath}`, value: val });
    } else if (Array.isArray(val)) {
      val.forEach((v, i) => {
        const res = objectToFlatMapDeep(v, `${childPath}.${i}.`, isFinal);
        result.push(...res);
      });
    } else if (val instanceof Date) {
      result.push({ path: `${childPath}`, value: val });
    } else if (typeof val === "object") {
      result.push(...objectToFlatMapDeep(val, `${childPath}.`, isFinal));
    } else {
      result.push({ path: `${childPath}`, value: val });
    }
  });

  return result;
}
