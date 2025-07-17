import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MessageService} from "primeng/api";

export const appConfig: ApplicationConfig = {
  providers: [
      provideZoneChangeDetection({ eventCoalescing: true }),
      MessageService,
      importProvidersFrom([BrowserAnimationsModule])
  ]
};
