import { Component, computed, effect, OnDestroy, Signal, untracked } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PlugComponent } from "../../components/plug/plug.component";
import { ApiService } from '../../services/api.service';
import { LoadingService } from '../../services/loading.service';
import { StatefulSignal } from '../../types/stateful-signal';
import { StatefulValue } from '../../types/stateful-value';

@Component({
    selector: 'app-stateful-signal-example-page',
    imports: [ReactiveFormsModule, PlugComponent],
    templateUrl: './stateful-signal-example-page.component.html',
    styleUrl: './stateful-signal-example-page.component.scss'
})
export class StatefulSignalExampleComponent implements OnDestroy {
  readonly state: Signal<StatefulValue<string>>;
  readonly isLoading = computed(() => this.state().isLoading());
  readonly hasError = computed(() => !!this.state().error());
  readonly welcomeMessage: StatefulSignal<boolean>;
  readonly formGroup = new FormGroup({
    throwError: new FormControl(false),
  });

  constructor(private loadingService: LoadingService, private apiService: ApiService) {
    this.welcomeMessage = new StatefulSignal();
    this.state = this.welcomeMessage.create((shouldThrow) => this.apiService.getWelcomeMessage({
      shouldThrow: shouldThrow ?? false,
    }));

    effect(() => {
      const isLoading = this.isLoading();

      untracked(() => {
        this.loadingService.toggle(isLoading);
      });
    });
  }

  ngOnDestroy(): void {
    this.welcomeMessage.destroy();
    this.loadingService.toggle(false);
  }

  onFetchWelcomeMessage(): void {
    const shouldThrowError = this.formGroup.controls.throwError.value ?? false;
    this.welcomeMessage.update(shouldThrowError);
  }
}
