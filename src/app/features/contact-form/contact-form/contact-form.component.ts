import {Component, OnInit} from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {Button, ButtonDirective} from "primeng/button";
import {InputTextareaModule} from "primeng/inputtextarea";
import {Ripple} from "primeng/ripple";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ContactInfoForm} from "../../../models/contact-info-form";
import { EmailService } from '../../../services/email-service/email.service';
import {AlertService} from "../../../services/alert-service/alert.service";
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
              private emailService: EmailService) {
  }

  ngOnInit(): void {
    this.resetForm();
  }
  
  resetForm(): void {
    this.contactForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      message: this.fb.control('', [Validators.required])
    });
  }
  
  submitForm(): void {
    this.emailService.sendEmail(this.contactForm?.value).subscribe(() => this.resetForm());
  }

}
