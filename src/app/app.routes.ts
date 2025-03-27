import { Routes } from '@angular/router';
import { HomeComponent } from './heroes/pages/home/home.component';
import { CreateComponent } from './heroes/pages/create/create.component'; 

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'edit', 
    redirectTo: (({ queryParams }) => {
      return queryParams['id'] ? `/edit/${queryParams['id']}` : '/create';
    }),
    pathMatch: 'full'
  },
  { path: 'edit/:id', component: CreateComponent },
  { path: 'create', component: CreateComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
