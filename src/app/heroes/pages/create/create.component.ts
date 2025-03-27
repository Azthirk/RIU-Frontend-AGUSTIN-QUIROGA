import { Component } from '@angular/core';
import { HeroFormComponent } from '../../components/hero-form/hero-form.component';

@Component({
  selector: 'app-create',
  imports: [ HeroFormComponent ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
  standalone: true
})
export class CreateComponent {}
