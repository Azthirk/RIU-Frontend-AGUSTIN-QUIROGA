import { Injectable, signal } from '@angular/core';
import { Hero } from '../models/hero.model';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
    constructor(private loadingService: LoadingService){}

    private heroes = signal<Hero[]>([
        { id: 1, name: 'Spiderman' },
        { id: 2, name: 'Iron Man', description: 'test' },
        { id: 3, name: 'Thor' },
        { id: 4, name: 'Thorx' },
    ]);

    createHero(hero: Hero): void {
        this.loadingService.show();
        this.heroes.update((currentHeroes) => [...currentHeroes, hero]);
        this.simulateAsyncOperation().then(() => this.loadingService.hide());
    }

    updateHero(id: number, updatedHero: Hero): void {
        this.loadingService.show();
        const currentHeroes = this.heroes();
        this.heroes.set(currentHeroes.map((hero) => hero.id === id ? { ...hero, ...updatedHero } : hero));
        this.simulateAsyncOperation().then(() => this.loadingService.hide());
    }
    
    deleteHero(id: number): void {
        this.loadingService.show();
        const currentHeroes = this.heroes();
        this.heroes.set(currentHeroes.filter((hero) => hero.id !== id));
        this.simulateAsyncOperation().then(() => this.loadingService.hide());
    }

    simulateAsyncOperation(): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, 500));
    }

    getHeroes(): () => Hero[] {
        return this.heroes;
    }

    getHeroById(id: number): Hero | null {
        const value = this.heroes().find((hero) => hero.id === id);
        return value || null;
    }

    getHeroByName(name: string): Hero[] {
        return this.heroes().filter((hero) => hero.name.toLowerCase().includes(name.toLowerCase()));
    }
}
