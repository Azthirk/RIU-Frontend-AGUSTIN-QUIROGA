import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-header',
  imports: [ MatIconModule ],
  templateUrl: './hero-header.component.html',
  styleUrl: './hero-header.component.scss',
  standalone: true,
})
export class HeroHeaderComponent {

  constructor(private router: Router){}

  redirectToUrl(url: string): void {
    this.router.navigate([url]);
  }
}
