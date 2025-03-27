import { Injectable, signal } from '@angular/core';
import { Hero } from '../models/hero.model';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
    private heroes = signal<Hero[]>([
        { id: 1, name: 'Spiderman' },
        { id: 2, name: 'Iron Man', description: 'test' },
        { id: 3, name: 'Thor' }
    ]);

    createHero(hero: Hero): void {
        this.heroes.update((currentHeroes) => [...currentHeroes, hero]);
    }

    updateHero(id: number, updatedHero: Hero): void {
        const currentHeroes = this.heroes();
        this.heroes.set(currentHeroes.map((hero) => hero.id === id ? { ...hero, ...updatedHero } : hero));
    }
    
    deleteHero(id: number): void {
        const currentHeroes = this.heroes();
        this.heroes.set(currentHeroes.filter((hero) => hero.id !== id));
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
