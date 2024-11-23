import { computed, effect, EffectRef, Signal, signal, untracked } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { catchError, EMPTY, finalize, Observable, of, Subject, switchMap, take, tap } from "rxjs";

export type SignalResourceOptions<TInput, TOutput> = {
  request?: () => TInput;
  loader: (input?: TInput) => Observable<TOutput>;
}

export class SignalResource<TInput, TOutput> {
  private readonly _isLoading = signal(false);
  private readonly _error = signal(null);
  private readonly reloadSubject = new Subject<TInput | void>();
  private readonly request: Signal<{ request: TInput | undefined }>;
  private readonly reqReactorRef: EffectRef;

  public readonly value: Signal<TOutput | null>;
  public readonly isLoading = this._isLoading.asReadonly();
  public readonly error = this._error.asReadonly();

  constructor(options: SignalResourceOptions<TInput, TOutput>) {
    this.request = computed(() => ({
      request: options.request ? options.request() : undefined,
    }));

    // Track value changes in provided request.
    this.reqReactorRef = effect(() => this.reqReactor(), { manualCleanup: true });

    this.value = toSignal(
      this.reloadSubject.pipe(
        tap(() => {
          this._error.set(null);
          this._isLoading.set(true);
        }),
        switchMap(inputValue => (
          inputValue
            ? options.loader(inputValue)
            : EMPTY
        ).pipe(
          take(1),
          catchError(err => {
            this._error.set(err);
            return of(null);
          }),
          finalize(() => this._isLoading.set(false)),
        )),
      ),
      {
        initialValue: null,
      },
    );
  }

  public reload(newValue?: TInput): void {
    this.reloadSubject.next(newValue);
  }

  public destroy(): void {
    this.reqReactorRef.destroy();
    this.reloadSubject.complete();
  }

  private reqReactor(): void {
    const { request } = this.request();
    untracked(() => this.reload(request));
  }
}

export function signalResource<TInput, TOutput>(
  options: SignalResourceOptions<TInput, TOutput>
): SignalResource<TInput, TOutput> {
  return new SignalResource(options);
}
