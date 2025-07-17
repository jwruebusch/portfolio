import { Component } from '@angular/core';
import {CardModule} from "primeng/card";

@Component({
  selector: 'app-skills',
  standalone: true,
    imports: [
        CardModule
    ],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  backendSkills = [
    { name: 'Java', proficiency: 95 },
    { name: 'JPA', proficiency: 95 },
    { name: 'Hibernate', proficiency: 95 },
    { name: 'Springboot', proficiency: 95 },
    { name: 'API Design', proficiency: 95 },
    { name: 'REST', proficiency: 95 },
    { name: 'Gradle', proficiency: 90 },
    { name: 'C#', proficiency: 90 },
  ]

  frontendSkills = [
    { name: 'Angular', proficiency: 95 },
    { name: 'TypeScript', proficiency: 95 },
    { name: 'JavaScript', proficiency: 95 },
    { name: 'Tailwind', proficiency: 95 },
    { name: 'HTML', proficiency: 95 },
    { name: 'CSS', proficiency: 95 },
    { name: 'JSON', proficiency: 95 },
    { name: 'Bootstrap', proficiency: 90 },
  ]

  toolingSkills = [
    { name: 'Git', proficiency: 95 },
    { name: 'Agile', proficiency: 95 },
    { name: 'Postman', proficiency: 90 },
    { name: 'Swagger', proficiency: 90 },
    { name: 'Kubernetes', proficiency: 85 },
    { name: 'ArgoCD', proficiency: 85 },
    { name: 'Jenkins', proficiency: 85 },
    { name: 'SonarQube', proficiency: 85 },
  ]
}
