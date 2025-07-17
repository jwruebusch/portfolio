import { Component } from '@angular/core';
import {MenubarModule} from "primeng/menubar";
import {AvatarModule} from "primeng/avatar";
import {Button} from "primeng/button";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    MenubarModule,
    AvatarModule,
    Button,
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  smoothScrollTo(elementId: string): void {
    document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
  }
}
