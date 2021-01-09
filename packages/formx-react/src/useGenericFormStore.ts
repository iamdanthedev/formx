import { useEffect, useMemo } from "react";
import { FormData, FormStore, FormStoreOptions } from "formx";

type Options<T extends FormData> = FormStoreOptions<T> & {
  exposeToWindowAs?: string;
};

export function useGenericFormStore<T extends FormData>(options: Options<T>) {
  const store = useMemo(() => new FormStore<T>(options), []);

  useEffect(() => {
    if (options.exposeToWindowAs && typeof window != "undefined") {
      (window as any)[options.exposeToWindowAs] = store;
    }
  });

  return store;
}
