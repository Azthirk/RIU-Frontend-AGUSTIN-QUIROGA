import { Routes } from '@angular/router';
import { HeroTableComponent } from './heroes/components/hero-table.component';

export const routes: Routes = [
  { path: '', component: HeroTableComponent },
  { path: '**', redirectTo: '' }
];
