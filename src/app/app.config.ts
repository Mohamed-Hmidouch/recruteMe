import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { Heart, Building2, MapPin, Search, LucideIconProvider, LUCIDE_ICONS } from 'lucide-angular';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { favoritesReducer } from './store/reducers/favorites.reducer';
import { FavoritesEffects } from './store/effects/favorites.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideStore(),
    provideState({ name: 'favorites', reducer: favoritesReducer }),
    provideEffects([FavoritesEffects]),
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ Heart, Building2, MapPin, Search })
    }
  ]
};
