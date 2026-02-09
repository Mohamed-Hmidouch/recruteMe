import { ActionReducerMap } from '@ngrx/store';
import * as fromFavorites from './reducers/favorites.reducer';

export interface AppState {
  favorites: fromFavorites.State;
}

export const reducers: ActionReducerMap<AppState> = {
  favorites: fromFavorites.favoritesReducer,
};
