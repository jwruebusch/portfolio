import { Routes } from '@angular/router';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {ExperiencePageComponent} from "./pages/experience-page/experience-page.component";
import {ContactPageComponent} from "./pages/contact-page/contact-page.component";

export const routes: Routes = [
    {
        path: 'home', pathMatch: 'full', component: HomePageComponent
    }, {
        path: 'experience', pathMatch: 'full', component: ExperiencePageComponent
    }, {
        path: 'contact', pathMatch: 'full', component: ContactPageComponent
    }
];
