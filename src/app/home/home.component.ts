import { Component } from '@angular/core';
import { HeroTableComponent } from '../heroes/components/hero-table/hero-table.component';

@Component({
  selector: 'app-home',
  imports: [HeroTableComponent],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
