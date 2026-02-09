import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { JobListItemComponent } from '../job-list-item/job-list-item';
import * as FavoritesActions from '../../store/actions/favorites.actions';
import { selectAllFavorites } from '../../store/selectors/favorites.selectors';
import { AppState } from '../../store';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, JobListItemComponent],
  templateUrl: './favorites.html',
  styleUrls: ['./favorites.sass']
})
export class FavoritesComponent implements OnInit {
  favorites$: Observable<any[]>;

  constructor(private store: Store<AppState>) {
    this.favorites$ = this.store.select(selectAllFavorites);
  }

  ngOnInit(): void {
    this.store.dispatch(FavoritesActions.loadFavorites());
  }

  removeFavorite(jobId: any): void {
    this.store.dispatch(FavoritesActions.removeFavorite({ jobId }));
  }
}
