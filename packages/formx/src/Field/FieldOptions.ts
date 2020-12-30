export type FieldOptions<T> = {
  transformValue?: (v: T) => T; // transform before saving to store
  parseValue?: (v: T) => T; // parse after reading from store
};
