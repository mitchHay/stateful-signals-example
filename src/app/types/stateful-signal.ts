import { Signal, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { catchError, finalize, map, Observable, of, startWith, Subject, switchMap, take, tap } from "rxjs";
import { StatefulValue } from "./stateful-value";

export class StatefulSignal<TInput> {
  // The $signalSubject is used here in the event we want to re-trigger the provided observable.
  private readonly $signalSubject: Subject<TInput | void>;
  private readonly isLoading = signal(false);

  constructor(subject?: Subject<TInput | void>) {
    // Allow for custom subjects, in the event we want to push some data to the observable.
    this.$signalSubject = subject ?? new Subject<TInput | void>();
  }

  create<TOutput>(createObservable: (input?: TInput) => Observable<TOutput>): Signal<StatefulValue<TOutput>> {
    // First determine the inner observable, allowing us to accurately call rxjs operators.
    // Without this, your side effects may not trigger properly.
    const determineInnerObservable = (inputValue: TInput | null | void) => {
      return inputValue
        ? createObservable(inputValue)
        : createObservable();
    };

    return toSignal(
      this.$signalSubject.pipe(
        startWith(null),
        tap(() => this.isLoading.set(true)),
        switchMap(inputValue => determineInnerObservable(inputValue).pipe(
            take(1),
            map(outputValue => ({
              result: outputValue as TOutput,
              error: null,
              isLoading: this.isLoading.asReadonly(),
            })),
            catchError(error => of({
              result: null,
              error: error,
              isLoading: this.isLoading.asReadonly(),
            })),
            finalize(() => this.isLoading.set(false)),
          )
        ),
      ),
      {
        initialValue: {
          result: null,
          error: null,
          isLoading: this.isLoading.asReadonly(),
        },
      },
    );
  }

  update(value?: TInput): void {
    this.$signalSubject.next(value);
  }
}
