import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-plug',
  imports: [],
  templateUrl: './plug.component.html',
  styleUrl: './plug.component.scss'
})
export class PlugComponent {
  @Input() title: string | undefined;
}
