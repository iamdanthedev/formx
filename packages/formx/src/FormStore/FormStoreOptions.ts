import { FormData, ValidateFunc } from "../types";

export interface FormStoreOptions<T extends FormData> {
  formName?: string;
  debounceValidationMs?: number;
  initialValues?: T;
  initialDirty?: boolean;
  initialDisabled?: boolean;
  onSubmit?: () => Promise<any>;
  validate?: ValidateFunc<T>;
}
