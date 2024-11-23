import { Component, effect, OnDestroy, signal, untracked, WritableSignal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PlugComponent } from "../../components/plug/plug.component";
import { ApiService, WelcomeMessageRequest } from '../../services/api.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-resource-example-page',
  imports: [ReactiveFormsModule, PlugComponent],
  templateUrl: './resource-example-page.component.html',
  styleUrl: './resource-example-page.component.scss'
})
export class ResourceExamplePageComponent implements OnDestroy {
  readonly welcomeMessageRequest: WritableSignal<WelcomeMessageRequest> = signal({ shouldThrow: false });
  readonly welcomeMessage = rxResource({
    request: () => this.welcomeMessageRequest(),
    loader: (params) => this.apiService.getWelcomeMessage(params.request),
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
