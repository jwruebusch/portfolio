import { Routes } from '@angular/router';
import {AboutMePageComponent} from "./pages/about-me-page/about-me-page.component";
import {ExperiencePageComponent} from "./pages/experience-page/experience-page.component";
import {ContactPageComponent} from "./pages/contact-page/contact-page.component";
import {ROUTE_NAMES} from "./constants/route-names";

export const routes: Routes = [
    {
        path: ROUTE_NAMES.ABOUT_ME, pathMatch: 'full', component: AboutMePageComponent
    }, {
        path: ROUTE_NAMES.EXPERIENCE, pathMatch: 'full', component: ExperiencePageComponent
    }, {
        path: ROUTE_NAMES.CONTACT, pathMatch: 'full', component: ContactPageComponent
    }, {
        path: '**', redirectTo: ROUTE_NAMES.ABOUT_ME
    }
];
