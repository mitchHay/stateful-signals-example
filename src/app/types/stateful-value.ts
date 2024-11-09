import { Signal } from "@angular/core";

export type StatefulValue<T> = {
  result: T | null,
  error: unknown | null,
  isLoading: Signal<boolean>,
};
