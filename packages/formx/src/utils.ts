export const isObject = (obj: any): boolean =>
  obj !== null && typeof obj === "object";

export const isPromise = (value: any): value is PromiseLike<any> =>
  isObject(value) && typeof value.then === "function";
