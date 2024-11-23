import { Component, effect, OnDestroy, signal, untracked, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PlugComponent } from "../../components/plug/plug.component";
import { ApiService, WelcomeMessageRequest } from '../../services/api.service';
import { LoadingService } from '../../services/loading.service';
import { signalResource } from '../../types/stateful-signal';

@Component({
    selector: 'app-stateful-signal-example-page',
    imports: [ReactiveFormsModule, PlugComponent],
    templateUrl: './stateful-signal-example-page.component.html',
    styleUrl: './stateful-signal-example-page.component.scss'
})
export class StatefulSignalExampleComponent implements OnDestroy {
  readonly welcomeMessageRequest: WritableSignal<WelcomeMessageRequest> = signal({ shouldThrow: false });
  readonly welcomeMessage = signalResource({
    request: () => this.welcomeMessageRequest(),
    loader: (value) => this.apiService.getWelcomeMessage(value),
  });

  readonly formGroup = new FormGroup({
    throwError: new FormControl(false),
  });

  constructor(private loadingService: LoadingService, private apiService: ApiService) {
    effect(() => {
      const isLoading = this.welcomeMessage.isLoading();

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
    this.welcomeMessageRequest.set({
      shouldThrow: shouldThrowError,
    });
  }
}
