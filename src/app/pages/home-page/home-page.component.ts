import { Component, computed, effect, Signal, untracked } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { delay, map, Observable, of } from 'rxjs';
import { LoadingService } from '../../services/loading.service';
import { StatefulSignal } from '../../types/stateful-signal';
import { StatefulValue } from '../../types/stateful-value';

@Component({
    selector: 'app-home-page',
    imports: [ReactiveFormsModule],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  readonly state: Signal<StatefulValue<string>>;
  readonly isLoading = computed(() => this.state().isLoading());
  readonly hasError = computed(() => !!this.state().error());
  readonly welcomeMessage: StatefulSignal<boolean>;
  readonly formGroup = new FormGroup({
    throwError: new FormControl(false),
  });

  constructor(private loadingService: LoadingService) {
    this.welcomeMessage = new StatefulSignal();
    this.state = this.welcomeMessage.create((shouldThrow) => this.getWelcomeMessage(shouldThrow));

    effect(() => {
      const isLoading = this.isLoading();

      untracked(() => {
        this.loadingService.toggle(isLoading);
      });
    });
  }

  onFetchWelcomeMessage(): void {
    const shouldThrowError = this.formGroup.controls.throwError.value ?? false;
    this.welcomeMessage.update(shouldThrowError);
  }

  private getWelcomeMessage(throwError?: boolean): Observable<string> {
    return of('Welcome to my app!').pipe(
      delay(2500),
      map((value) => {
        if (throwError) {
          throw new Error();
        }

        return value;
      }),
    );
  }
}
