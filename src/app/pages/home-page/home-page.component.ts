import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PlugComponent } from "../../components/plug/plug.component";

@Component({
  selector: 'app-home-page',
  imports: [RouterModule, PlugComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
