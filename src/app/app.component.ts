import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavComponent} from "./features/nav/nav.component";
import {BackgroundComponent} from "./features/background/background.component";
import {ToastModule} from "primeng/toast";
import {AlertService} from "./services/alert-service/alert.service";
import {HeroSectionComponent} from "./features/hero-section/hero-section.component";
import {AboutMeComponent} from "./features/about-me/about-me.component";
import {ExperienceComponent} from "./features/experience/experience.component";
import {SkillsComponent} from "./features/skills/skills.component";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [RouterOutlet, NavComponent, BackgroundComponent, ToastModule, HeroSectionComponent, AboutMeComponent, ExperienceComponent, SkillsComponent],
  providers: [AlertService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio';
}
