import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadSpinnerOverlayComponent } from './components/load-spinner-overlay/load-spinner-overlay.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadSpinnerOverlayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'stateful-signals-example';
}
