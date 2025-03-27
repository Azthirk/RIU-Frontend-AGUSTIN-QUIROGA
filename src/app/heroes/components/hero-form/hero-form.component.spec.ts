import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroFormComponent } from './hero-form.component';
import { HeroService } from '../../services/hero.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

describe('HeroFormComponent', () => {
  let component: HeroFormComponent;
  let fixture: ComponentFixture<HeroFormComponent>;
  let mockHeroService: jasmine.SpyObj<HeroService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(async () => {
    mockHeroService = jasmine.createSpyObj('HeroService', ['getHeroes', 'getHeroById', 'updateHero', 'createHero']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = jasmine.createSpyObj('ActivatedRoute', ['snapshot']);
    mockActivatedRoute.snapshot = { paramMap: { get: () => null } } as any;

    mockHeroService.getHeroes.and.returnValue(() => [
      { id: 1, name: 'Spiderman' },
      { id: 2, name: 'Iron Man' }
    ]);

    await TestBed.configureTestingModule({
      imports: [ HeroFormComponent ],
      providers: [
        { provide: HeroService, useValue: mockHeroService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    component.ngOnInit();
    expect(component.formGeneral instanceof FormGroup).toBeTruthy();
    expect(component.formGeneral.controls['name'].value).toBe('');
    expect(component.formGeneral.controls['description'].value).toBe('');
  });

  it('should generate a unique ID if no ID is present', () => {
    mockHeroService.getHeroes.and.returnValue(() => []);
    spyOn(component, 'generateUniqueId').and.returnValue(999);

    component.ngOnInit();
    
    expect(component.formGeneral.controls['id'].value).toBe(999);
  });

  it('should create a new hero with a unique id when no heroId is present', () => {
    mockActivatedRoute.snapshot = {
      paramMap: {
        get: jasmine.createSpy().and.returnValue(null)
      }
    } as any;
    mockHeroService.getHeroes.and.returnValue(() => []);

    fixture.detectChanges();
    component.ngOnInit();

    const newId = component.formGeneral.controls['id'].value;
    expect(newId).toBeGreaterThan(0);
    expect(component.formGeneral.controls['id'].value).not.toBeNull();
  });

  it('should navigate to home after save', () => {
    component.formGeneral.controls['id'].setValue('999');
    component.formGeneral.controls['name'].setValue('Superman');
    component.formGeneral.markAsDirty();
    component.createOrUpdate();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['home']);
  });

  it('should not save if the form is invalid', () => {
    component.formGeneral.controls['name'].setValue('');
    component.formGeneral.controls['description'].setValue('');
    component.formGeneral.markAsDirty();
    component.createOrUpdate();
    expect(mockHeroService.createHero).not.toHaveBeenCalled();
  });

  it('should call updateHero if heroId is present and form is valid', () => {
    const hero = { id: 1, name: 'Spiderman', description: 'test' };
    mockHeroService.getHeroById.and.returnValue(hero);

    component.heroId.set('1');
    component.ngOnInit();
    
    component.formGeneral.controls['name'].setValue('Updated Spiderman');
    component.formGeneral.markAsDirty();
    component.createOrUpdate();

    expect(mockHeroService.updateHero).toHaveBeenCalledWith(hero.id, { ...hero, name: 'Updated Spiderman' });
  });
});