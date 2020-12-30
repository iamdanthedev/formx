export type FieldState<T> = {
  clear: boolean;
  dirty: boolean;
  disabled: boolean;
  error: string;
  initialValue: T;
  focused: boolean;
  invalid: boolean;
  name: string;
  touched: boolean;
  valid: boolean;
  value: T;
};
