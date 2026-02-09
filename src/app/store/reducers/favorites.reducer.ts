import { createReducer, on } from '@ngrx/store';
import * as FavoritesActions from '../actions/favorites.actions';
import { Favorite } from '../../models/favorite.model';

export interface State {
  favorites: Favorite[];
  error: string | null;
}

export const initialState: State = {
  favorites: [],
  error: null
};

export const favoritesReducer = createReducer(
  initialState,
  on(FavoritesActions.addFavorite, (state, { job }) => ({
    ...state,
    favorites: [...state.favorites, {
      jobId: job.id,
      userId: 0, // Will be set by service
      title: job.name,
      company: job.company.name,
      location: job.locations[0]?.name || 'Remote',
      url: job.refs.landing_page
    } as Favorite]
  })),
  on(FavoritesActions.removeFavorite, (state, { jobId }) => ({
    ...state,
    favorites: state.favorites.filter(fav => fav.jobId?.toString() !== jobId)
  })),
  on(FavoritesActions.loadFavoritesSuccess, (state, { favorites }) => ({
    ...state,
    favorites,
    error: null
  })),
  on(FavoritesActions.loadFavoritesFailure, (state, { error }) => ({
    ...state,
    error
  }))
);
