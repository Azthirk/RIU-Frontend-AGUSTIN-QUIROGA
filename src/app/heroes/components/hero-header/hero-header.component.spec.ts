import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroHeaderComponent } from './hero-header.component';

describe('HeroHeaderComponent', () => {
  let component: HeroHeaderComponent;
  let fixture: ComponentFixture<HeroHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
