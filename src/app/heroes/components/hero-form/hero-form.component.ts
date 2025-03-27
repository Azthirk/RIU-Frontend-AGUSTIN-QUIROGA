import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Hero } from '../../models/hero.model';
import { HeroService } from '../../services/hero.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-hero-form',
  imports: [ MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule ],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.scss',
  standalone: true,
})
export class HeroFormComponent implements OnInit {
  heroId = signal<string | null>(null);

  heroData: Hero | null = null;

  formGeneral: FormGroup;

  constructor(
    private heroService: HeroService, 
    private route: ActivatedRoute,
    private router: Router
  ){
    this.formGeneral = new FormGroup({
      id: new FormControl({value: '', disabled: true }),
      name: new FormControl('', [Validators.required]),
      description: new FormControl('')
    })

    this.route.paramMap.subscribe(params => {
      this.heroId.set(params.get('id'));
    });
  }

  ngOnInit() {
    if (this.heroId()) {
      this.heroData = this.heroService.getHeroById(Number(this.heroId()));
      if(this.heroData){
        this.formGeneral.controls['id'].setValue(this.heroData.id);
        this.formGeneral.controls['name'].setValue(this.heroData.name);
        this.formGeneral.controls['description'].setValue(this.heroData.description);
      }
    }
  }

  createOrUpdate(){
    if(this.formGeneral.invalid) return;
    const heroItem: Hero = this.formGeneral.getRawValue();
    if(this.heroId()){
      this.heroService.updateHero(heroItem.id, heroItem);
    }else{
      this.heroService.createHero(heroItem);
    }
    this.redirectToUrl('/home')
  }

  redirectToUrl(url: string): void {
    this.router.navigate([url]);
  }
}
