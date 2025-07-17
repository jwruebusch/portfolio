import { Component } from '@angular/core';
import {CardModule} from "primeng/card";

@Component({
  selector: 'app-about-me',
  standalone: true,
    imports: [
        CardModule
    ],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {

}
