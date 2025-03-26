import { Component, computed, signal } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { Hero } from '../../models/hero.model';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-hero-table',
  imports: [ MatIconModule, MatPaginatorModule, MatInputModule ],
  templateUrl: './hero-table.component.html',
  styleUrls: ['./hero-table.component.scss'],
  standalone: true,
})

export class HeroTableComponent {
  heroes: any;

  pageSize = signal(5);
  
  pageIndex = signal(0);

  paginatedHeroes = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    return this.filteredHeroes().slice(start, start + this.pageSize());
  });

  searchQuery = signal('');

  filteredHeroes = computed(() => {
    const query = this.searchQuery().toLowerCase();
    return this.heroes().filter((hero: Hero) =>
      hero.name.toLowerCase().includes(query) || hero.id.toString().includes(query)
    );
  });

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

  getTotalHeroes() {
    return this.filteredHeroes().length;
  }
  
  handlePageEvent(event: PageEvent) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }

  handleSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
    this.pageIndex.set(0);
  }
}
