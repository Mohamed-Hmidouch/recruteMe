import { createAction, props } from '@ngrx/store';
import { Job } from '../../models/job.model';
import { Favorite } from '../../models/favorite.model';

export const addFavorite = createAction(
  '[Favorites] Add Favorite',
  props<{ job: Job }>()
);

export const removeFavorite = createAction(
  '[Favorites] Remove Favorite',
  props<{ jobId: string }>()
);

export const loadFavorites = createAction(
  '[Favorites] Load Favorites'
);

export const loadFavoritesSuccess = createAction(
  '[Favorites] Load Favorites Success',
  props<{ favorites: Favorite[] }>()
);

export const loadFavoritesFailure = createAction(
  '[Favorites] Load Favorites Failure',
  props<{ error: string }>()
);
