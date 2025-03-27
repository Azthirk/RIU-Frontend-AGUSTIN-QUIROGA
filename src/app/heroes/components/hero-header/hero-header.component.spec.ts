import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroHeaderComponent } from './hero-header.component';
import { Router } from '@angular/router';

describe('HeroHeaderComponent', () => {
  let component: HeroHeaderComponent;
  let fixture: ComponentFixture<HeroHeaderComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [HeroHeaderComponent ],
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the correct URL when redirectToUrl is called', () => {
    const url = 'edit';
    component.redirectToUrl(url);
    expect(mockRouter.navigate).toHaveBeenCalledWith([url]);
  });
});
