import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from './auth';
import { Favorite } from '../models/favorite.model';
import { Job } from '../models/job.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private apiUrl = 'http://localhost:3000/favoritesOffers';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getFavorites(): Observable<Favorite[]> {
    const user = this.authService.getCurrentUser();
    return this.http.get<Favorite[]>(`${this.apiUrl}?userId=${user?.id}`);
  }

  addFavorite(job: Job): Observable<Favorite> {
    const user = this.authService.getCurrentUser();
    const favorite: Omit<Favorite, 'id'> = {
      jobId: job.id,
      userId: user?.id!,
      title: job.name,
      company: job.company.name,
      location: job.locations[0]?.name || 'Remote',
      url: job.refs.landing_page
    };
    return this.http.post<Favorite>(this.apiUrl, favorite);
  }

  removeFavoriteByJobId(jobId: string): Observable<void> {
    const user = this.authService.getCurrentUser();
    // First find the favorite by jobId and userId, then delete it
    return this.http.get<Favorite[]>(`${this.apiUrl}?userId=${user?.id}&jobId=${jobId}`).pipe(
      switchMap(favorites => {
        if (favorites.length > 0) {
          return this.http.delete<void>(`${this.apiUrl}/${favorites[0].id}`);
        }
        throw new Error('Favorite not found');
      })
    );
  }

  removeFavorite(favoriteId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${favoriteId}`);
  }
}
