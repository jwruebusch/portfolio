import { Injectable } from '@angular/core';
import emailJS from "emailjs-com";

@Injectable({
  providedIn: 'root'
})
export class EmailServiceService {

  constructor() { }
  
  sendEmail(contactInfo: any): Promise<any> {
    return emailJS.send('service_812yoem', 'template_ewrqfri', contactInfo, 'plsMSZQfanzFMFY_o');
  }
}
