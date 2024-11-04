import { Injectable } from '@angular/core';
import emailJS from "emailjs-com";
import {catchError, from, Observable, tap, throwError} from "rxjs";
import {AlertService} from "../alert-service/alert.service";

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private serviceId = process.env['EMAIL_SERVICE_ID'] ?? '';
  private templateId = process.env['EMAIL_TEMPLATE_ID'] ?? '';
  private publicId = process.env['EMAIL_PUBLIC_ID'] ?? '';

  constructor(private alertService: AlertService) { }
  
  sendEmail(contactInfo: any): Observable<any> {
    return from(emailJS.send(this.serviceId, this.templateId, contactInfo, this.publicId)).pipe(
      tap(() => this.alertService.addSuccess('Email sent successfully')),
      catchError((error) => {
        this.alertService.addError('Failed to send email');
        return throwError(() => error);
      })
    );
  }
}
