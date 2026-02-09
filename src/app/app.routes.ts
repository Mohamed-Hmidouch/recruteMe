import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { JobSearchComponent } from './components/job-search/job-search';
import { FavoritesComponent } from './components/favorites/favorites';
import { ApplicationsComponent } from './components/applications/applications';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'search', component: JobSearchComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'applications', component: ApplicationsComponent },
  { path: '**', redirectTo: '' } // Wildcard route for a 404-like redirect to home
];
