import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavComponent} from "./features/nav/nav.component";
import {BackgroundComponent} from "./features/background/background.component";
import {ToastModule} from "primeng/toast";
import {AlertService} from "./services/alert-service/alert.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, BackgroundComponent, ToastModule],
  providers: [AlertService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio';
}
