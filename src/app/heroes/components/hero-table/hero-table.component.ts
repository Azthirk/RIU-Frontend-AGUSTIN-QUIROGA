import { Component, computed, signal } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { Hero } from '../../models/hero.model';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HeroModalComponent } from '../hero-modal/hero-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-table',
  imports: [ MatIconModule, MatPaginatorModule, MatInputModule, MatTooltipModule, HeroModalComponent ],
  templateUrl: './hero-table.component.html',
  styleUrls: ['./hero-table.component.scss'],
  standalone: true,
})

export class HeroTableComponent {
  heroes: () => Hero[];

  pageSize = signal(10);
  
  pageIndex = signal(0);
  
  searchQuery = signal('');

  showModal = false;

  itemSelected: Hero | null = null;

  paginatedHeroes = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    return this.filteredHeroes().slice(start, start + this.pageSize());
  });

  filteredHeroes = computed(() => {
    const query = this.searchQuery().toLowerCase();
    return this.heroes().filter((hero: Hero) =>
      hero.name.toLowerCase().includes(query) || hero.id.toString().includes(query)
    );
  });

  constructor(
    private heroService: HeroService,
    private router: Router
  ) {
    this.heroes = this.heroService.getHeroes();
  }

  deleteHero(id: number) {
    this.heroService.deleteHero(id);
    this.pageIndex.set(0);
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

  modalFunction(event: boolean){
    if(event){
      if(this.itemSelected){
        const { id }: Hero = this.itemSelected;
        this.deleteHero(id);
      }
    } else {
      this.itemSelected = null;
    }   

    this.showModal = false;
  }

  viewModal(item: Hero){
    this.itemSelected = item;
    this.showModal = !this.showModal;
  }

  redirectToUrl(url: string, item: Hero): void {
    this.router.navigate([url, item.id]);
  }

  changeTotalItems(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = parseInt(input.value, 10);
    if (Number.isNaN(value) || value <= 0) return;
    this.pageSize.set(value);
    this.pageIndex.set(0);
  }
}
