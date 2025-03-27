import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroTableComponent } from './hero-table.component';
import { HeroService } from '../../services/hero.service';
import { Router } from '@angular/router';
import { Hero } from '../../models/hero.model';

describe('HeroTableComponent', () => {
  let component: HeroTableComponent;
  let fixture: ComponentFixture<HeroTableComponent>;
  let mockHeroService: jasmine.SpyObj<HeroService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockHeroService = jasmine.createSpyObj('HeroService', ['getHeroes', 'deleteHero']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    mockHeroService.getHeroes.and.returnValue(() => [
      { id: 1, name: 'Spiderman' },
      { id: 2, name: 'Iron Man' }
    ]);

    await TestBed.configureTestingModule({
      imports: [HeroTableComponent],
      providers: [
        { provide: HeroService, useValue: mockHeroService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete a hero', () => {
    component.deleteHero(1);
    expect(mockHeroService.deleteHero).toHaveBeenCalledWith(1);
  });

  it('should filter heroes by name', () => {
    component.searchQuery.set('spider');
    expect(component.filteredHeroes().length).toBe(1);
    expect(component.filteredHeroes()[0].name).toBe('Spiderman');
  });

  it('should update pagination on handlePageEvent', () => {
    component.handlePageEvent({ pageIndex: 1, pageSize: 5, length: 10 } as any);
    expect(component.pageIndex()).toBe(1);
    expect(component.pageSize()).toBe(5);
  });

  it('should toggle modal and set selected hero', () => {
    const hero: Hero = { id: 2, name: 'Iron Man' };
    component.viewModal(hero);
    expect(component.showModal).toBeTrue();
    expect(component.itemSelected).toEqual(hero);
  });
});
