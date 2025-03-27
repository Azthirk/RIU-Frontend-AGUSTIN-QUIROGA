import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-hero-header',
  imports: [ MatIconModule ],
  templateUrl: './hero-header.component.html',
  styleUrl: './hero-header.component.scss',
  standalone: true,
})
export class HeroHeaderComponent {}
