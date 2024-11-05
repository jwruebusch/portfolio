import { Component } from '@angular/core';
import {MenubarModule} from "primeng/menubar";
import {MenuItem} from "primeng/api";
import {NAV_OPTIONS} from "./nav-options";
import {AvatarModule} from "primeng/avatar";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    MenubarModule,
    AvatarModule,
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  items: MenuItem[] = NAV_OPTIONS;
}
