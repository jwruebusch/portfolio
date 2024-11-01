import { Component } from '@angular/core';
import {CardModule} from "primeng/card";
import {ContactFormComponent} from "../../features/contact-form/contact-form/contact-form.component";

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [
    CardModule,
    ContactFormComponent
  ],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss'
})
export class ContactPageComponent {

}
