import { Component } from '@angular/core';
import { HeroTableComponent } from '../../components/hero-table/hero-table.component';
import { HeroModalComponent } from '../../components/hero-modal/hero-modal.component';

@Component({
  selector: 'app-home',
  imports: [ HeroTableComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent {}
