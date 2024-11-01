import {FormControl} from "@angular/forms";

export interface ContactInfo {
    name: string;
    email: string;
    message: string;
}

export type ContactInfoForm = {[K in keyof ContactInfo]: FormControl<ContactInfo[K] | null> };
