import { Component, computed } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-load-spinner-overlay',
  standalone: true,
  imports: [],
  templateUrl: './load-spinner-overlay.component.html',
  styleUrl: './load-spinner-overlay.component.scss'
})
export class LoadSpinnerOverlayComponent {
  readonly showSpinner = computed(() => this.loadingService.isVisible());

  constructor(private loadingService: LoadingService) {}
}
