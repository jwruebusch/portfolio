import { Component } from '@angular/core';
import {CardModule} from "primeng/card";

@Component({
  selector: 'app-experience',
  standalone: true,
    imports: [
        CardModule
    ],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {

}
