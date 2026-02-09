import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as FavoritesActions from '../actions/favorites.actions';
import { FavoritesService } from '../../services/favorites.service';

@Injectable()
export class FavoritesEffects {
  private actions$ = inject(Actions);
  private favoritesService = inject(FavoritesService);

  loadFavorites$ = createEffect(() => this.actions$.pipe(
    ofType(FavoritesActions.loadFavorites),
    mergeMap(() => this.favoritesService.getFavorites()
      .pipe(
        map(favorites => FavoritesActions.loadFavoritesSuccess({ favorites })),
        catchError(error => of(FavoritesActions.loadFavoritesFailure({ error: error.message || 'Failed to load favorites' })))
      ))
    )
  );

  addFavorite$ = createEffect(() => this.actions$.pipe(
    ofType(FavoritesActions.addFavorite),
    mergeMap(action => this.favoritesService.addFavorite(action.job)
      .pipe(
        map(() => FavoritesActions.loadFavorites()),
        catchError(error => of(FavoritesActions.loadFavoritesFailure({ error: error.message || 'Failed to add favorite' })))
      ))
    )
  );

  removeFavorite$ = createEffect(() => this.actions$.pipe(
    ofType(FavoritesActions.removeFavorite),
    mergeMap(action => this.favoritesService.removeFavoriteByJobId(action.jobId)
      .pipe(
        map(() => FavoritesActions.loadFavorites()),
        catchError(error => of(FavoritesActions.loadFavoritesFailure({ error: error.message || 'Failed to remove favorite' })))
      ))
    )
  );
}
