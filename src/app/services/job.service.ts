import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, catchError, of, throwError } from 'rxjs';
import { Job, TheMuseResponse } from '../models/job.model';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private http = inject(HttpClient);
  private apiUrl = 'https://www.themuse.com/api/public/jobs';
  private apiKey = '90bac9b1af1b3797c24d397ce3b9ff948556bc89187d06042b3a910860591ced';

  getJobs(page: number = 1, pageSize: number = 20, keywords?: string, location?: string) {
    let url = `${this.apiUrl}?api_key=${this.apiKey}&page=${page}&page_size=${pageSize}`;
    
    if (keywords) {
      url += `&category=${encodeURIComponent(keywords)}`;
    }
    if (location) {
      url += `&location=${encodeURIComponent(location)}`;
    }
    
    return this.http
      .get<TheMuseResponse>(url)
      .pipe(
        map((res) => ({
          results: res.results,
          page: res.page,
          page_count: res.page_count,
          total: res.total,
        })),
        catchError((error) => {
          console.error('Error fetching jobs:', error);
          return of({ results: [], page: 0, page_count: 0, total: 0 });
        })
      );
  }

  getJob(id: number) {
    return this.http
      .get<Job>(`${this.apiUrl}/${id}?api_key=${this.apiKey}`)
      .pipe(
        catchError((error) => {
          console.error(`Error fetching job with id ${id}:`, error);
          return throwError(() => error);
        })
      );
  }
}
