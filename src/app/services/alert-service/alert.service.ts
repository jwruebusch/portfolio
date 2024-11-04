import { Injectable } from '@angular/core';
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private messageService: MessageService) { }
  
    addSuccess(message: string): void {
        this.messageService.add({severity:'success', summary:'Success', detail:message});
    }
    
    addError(message: string): void {
        this.messageService.add({severity:'error', summary:'Error', detail:message});
    }
}
