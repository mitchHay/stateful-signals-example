import { Signal } from "@angular/core";

export type StatefulValue<T> = {
  result: T | null,
  error: Signal<unknown | null>,
  isLoading: Signal<boolean>,
};
