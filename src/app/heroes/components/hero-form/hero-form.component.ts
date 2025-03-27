import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Hero } from '../../models/hero.model';
import { HeroService } from '../../services/hero.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UppercaseDirective } from '../../../shared/directives/uppercase.directive';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-hero-form',
  imports: [ MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule, UppercaseDirective ],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.scss',
  standalone: true,
})
export class HeroFormComponent implements OnInit {
  heroId = signal<string | null>(null);

  heroData: Hero | null = null;

  formGeneral: FormGroup;

  existingIds: () => Hero[];

  constructor(
    private heroService: HeroService, 
    private route: ActivatedRoute,
    private router: Router
  ){
    this.existingIds = this.heroService.getHeroes();
    this.formGeneral = new FormGroup({
      id: new FormControl({value: '', disabled: true }),
      name: new FormControl('', [Validators.required]),
      description: new FormControl('')
    })

    this.heroId.set(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    if (this.heroId()) {
      this.heroData = this.heroService.getHeroById(Number(this.heroId()));
      if(this.heroData){
        this.formGeneral.controls['id'].setValue(this.heroData.id);
        this.formGeneral.controls['name'].setValue(this.heroData.name);
        this.formGeneral.controls['description'].setValue(this.heroData.description);
      }
    }else{
      const newID = this.generateUniqueId();
      this.formGeneral.controls['id'].setValue(newID);
    }
  }

  generateUniqueId(): number {
    const existingIds = new Set(this.existingIds().map(hero => hero.id));
  
    let newId: number;
    do {
      newId = Math.floor(Math.random() * 999) + 1;
    } while (existingIds.has(newId));
  
    return newId;
  };

  createOrUpdate(){
    if(this.formGeneral.invalid || !this.formGeneral.dirty) return;
    const heroItem: Hero = this.formGeneral.getRawValue();
    if(this.heroId()){
      this.heroService.updateHero(heroItem.id, heroItem);
    }else{
      this.heroService.createHero(heroItem);
    }
    this.redirectToUrl('home')
  }

  redirectToUrl(url: string): void {
    this.router.navigate([url]);
  }
}
