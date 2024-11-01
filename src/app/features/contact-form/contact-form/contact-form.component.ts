import {Component, OnInit} from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {Button, ButtonDirective} from "primeng/button";
import {InputTextareaModule} from "primeng/inputtextarea";
import {Ripple} from "primeng/ripple";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ContactInfoForm} from "../../../models/contact-info-form";
import { EmailServiceService } from '../../../services/email-service/email-service.service';
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    InputTextModule,
    CommonModule,
    Button,
    InputTextareaModule,
    ButtonDirective,
    Ripple,
    ReactiveFormsModule
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup<ContactInfoForm> | null = null;
  constructor(private fb: FormBuilder,
              private emailService: EmailServiceService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.messageService.add({severity:'success', summary:'Success', detail:'Email sent successfully'});
    this.resetForm();
  }
  
  resetForm(): void {
    this.contactForm = this.fb.group({
      name: '',
      email: '',
      message: ''
    });
  }
  
  submitForm(): void {
    this.emailService.sendEmail(this.contactForm?.value).then(
        (_response) => {
            this.resetForm();
            this.messageService.add({severity:'success', summary:'Success', detail:'Email sent successfully'});
        },
        (_error) => {
            this.messageService.add({severity:'error', summary:'Error', detail:'Failed to send email'});
        }
    );
  }

}
