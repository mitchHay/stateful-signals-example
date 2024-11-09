import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private readonly _isVisible = signal(false);

  public readonly isVisible = this._isVisible.asReadonly();

  public toggle(isVisible: boolean): void {
    this._isVisible.set(isVisible);
  }
}
