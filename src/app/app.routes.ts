import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { JobSearchComponent } from './components/job-search/job-search';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './components/profile/profile';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'search', component: JobSearchComponent },
  {
    path: 'favorites',
    loadComponent: () => import('./components/favorites/favorites').then(m => m.FavoritesComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'applications',
    loadComponent: () => import('./components/applications/applications').then(m => m.ApplicationsComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' } // Wildcard route for a 404-like redirect to home
];
