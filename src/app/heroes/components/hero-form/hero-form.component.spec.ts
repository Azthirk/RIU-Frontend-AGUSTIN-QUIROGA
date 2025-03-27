import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroFormComponent } from './hero-form.component';
import { HeroService } from '../../services/hero.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

describe('HeroFormComponent', () => {
  let component: HeroFormComponent;
  let fixture: ComponentFixture<HeroFormComponent>;
  let heroServiceSpy: jasmine.SpyObj<HeroService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(async () => {
    heroServiceSpy = jasmine.createSpyObj('HeroService', ['getHeroes', 'getHeroById', 'updateHero', 'createHero']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    activatedRouteSpy = {
      snapshot: { paramMap: { get: jasmine.createSpy('get').and.returnValue(null) } },
    } as unknown as jasmine.SpyObj<ActivatedRoute>;

    await TestBed.configureTestingModule({
      declarations: [HeroFormComponent],
      providers: [
        { provide: HeroService, useValue: heroServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    component.ngOnInit();
    expect(component.formGeneral instanceof FormGroup).toBeTruthy();
    expect(component.formGeneral.controls['name'].value).toBe('');
    expect(component.formGeneral.controls['description'].value).toBe('');
  });

  it('should generate a unique ID if no ID is present', () => {
    heroServiceSpy.getHeroes.and.returnValue(() => []);
    spyOn(component, 'generateUniqueId').and.returnValue(999);

    component.ngOnInit();
    
    expect(component.formGeneral.controls['id'].value).toBe(999);
  });

  it('should call createHero when creating a new hero', () => {
    heroServiceSpy.getHeroes.and.returnValue(() => []);
    component.ngOnInit();
    component.formGeneral.controls['name'].setValue('Spiderman');

    component.createOrUpdate();
    
    expect(heroServiceSpy.createHero).toHaveBeenCalledWith(jasmine.any(Object));
  });

  it('should navigate to home after save', () => {
    component.createOrUpdate();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['home']);
  });
});