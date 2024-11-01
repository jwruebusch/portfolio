import { Component } from '@angular/core';
import {CardModule} from "primeng/card";

@Component({
  selector: 'app-home-page',
  standalone: true,
    imports: [
        CardModule
    ],
  templateUrl: './about-me-page.component.html',
  styleUrl: './about-me-page.component.scss'
})
export class AboutMePageComponent {

}
