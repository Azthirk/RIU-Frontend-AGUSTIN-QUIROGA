import { TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { Hero } from '../models/hero.model';

describe('HeroService', () => {
  let service: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return initial heroes', () => {
    const heroes = service.getHeroes()();
    expect(heroes.length).toBe(3);
  });

  it('should create a new hero', () => {
    const newHero: Hero = { id: 4, name: 'Hulk' };
    service.createHero(newHero);
    const heroes = service.getHeroes()();
    expect(heroes.length).toBe(4);
    expect(heroes.some(hero => hero.id === 4)).toBeTrue();
  });

  it('should update an existing hero', () => {
    const updatedHero: Hero = { id: 2, name: 'Iron Man', description: 'Updated description' };
    service.updateHero(2, updatedHero);
    const hero = service.getHeroById(2);
    expect(hero?.description).toBe('Updated description');
  });

  it('should delete a hero', () => {
    service.deleteHero(1);
    const heroes = service.getHeroes()();
    expect(heroes.length).toBe(2);
    expect(heroes.some(hero => hero.id === 1)).toBeFalse();
  });

  it('should get hero by id', () => {
    const hero = service.getHeroById(2);
    expect(hero).toBeTruthy();
    expect(hero?.name).toBe('Iron Man');
  });

  it('should return null if hero by id does not exist', () => {
    const hero = service.getHeroById(99);
    expect(hero).toBeNull();
  });

  it('should get hero by name', () => {
    const heroes = service.getHeroByName('spider');
    expect(heroes.length).toBe(1);
    expect(heroes[0].name).toBe('Spiderman');
  });

  it('should return empty array if no hero matches the name', () => {
    const heroes = service.getHeroByName('unknown');
    expect(heroes.length).toBe(0);
  });
});
