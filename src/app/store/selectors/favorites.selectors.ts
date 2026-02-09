import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFavorites from '../reducers/favorites.reducer';
import { Favorite } from '../../models/favorite.model';

export const selectFavoritesState = createFeatureSelector<fromFavorites.State>('favorites');

export const selectAllFavorites = createSelector(
  selectFavoritesState,
  (state: fromFavorites.State) => state.favorites
);

export const selectFavoritesError = createSelector(
  selectFavoritesState,
  (state: fromFavorites.State) => state.error
);

export const selectIsFavorite = (jobId: string) => createSelector(
  selectAllFavorites,
  (favorites: Favorite[]) => favorites.some(fav => fav.jobId?.toString() === jobId)
);
