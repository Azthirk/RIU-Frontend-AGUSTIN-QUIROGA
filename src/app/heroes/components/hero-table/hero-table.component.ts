import { Component } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { Hero } from '../../models/hero.model';

@Component({
  selector: 'app-hero-table',
  templateUrl: './hero-table.component.html',
  styleUrls: ['./hero-table.component.scss'],
  standalone: true,
  imports: []
})
export class HeroTableComponent {
  heroes: () => Hero[];

  constructor(private heroService: HeroService) {
    this.heroes = this.heroService.getHeroes();
  }

  addHero(newHero: Hero) {
    this.heroService.registerHero(newHero);
  }

  updateHero(id: number, hero: Hero) {
    this.heroService.updateHero(id, hero);
  }

  deleteHero(id: number) {
    this.heroService.deleteHero(id);
  }

  trackById(index: number, hero: Hero) {
    return hero.id;
  }
}
