import { Injectable } from '@angular/core';
import emailJS from "emailjs-com";
import {catchError, from, Observable, tap, throwError} from "rxjs";
import {AlertService} from "../alert-service/alert.service";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  constructor(private alertService: AlertService) { }
  
  sendEmail(contactInfo: any): Observable<any> {
    return from(this.emailPromise(contactInfo)).pipe(
      tap(() => this.alertService.addSuccess('Email sent successfully')),
      catchError((error) => {
        this.alertService.addError('Failed to send email');
        return throwError(() => error);
      })
    );
  }
  
  private emailPromise(contactInfo: any): Promise<any> {
    return emailJS.send(environment.EMAIL_SERVICE_ID, environment.EMAIL_TEMPLATE_ID, contactInfo, environment.EMAIL_PUBLIC_ID);
  }
}
