import { Component } from '@angular/core';
import { HeroTableComponent } from '../../components/hero-table/hero-table.component';

@Component({
  selector: 'app-home',
  imports: [ HeroTableComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent {}
