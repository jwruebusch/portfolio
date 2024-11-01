import { Component } from '@angular/core';
import {CardModule} from "primeng/card";

@Component({
  selector: 'app-experience-page',
  standalone: true,
    imports: [
        CardModule
    ],
  templateUrl: './experience-page.component.html',
  styleUrl: './experience-page.component.scss'
})
export class ExperiencePageComponent {

}
