import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, catchError, of, throwError, forkJoin } from 'rxjs';
import { Job, TheMuseResponse } from '../models/job.model';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private http = inject(HttpClient);
  private apiUrl = 'https://www.themuse.com/api/public/jobs';
  private apiKey = '90bac9b1af1b3797c24d397ce3b9ff948556bc89187d06042b3a910860591ced';

  getJobs(page: number = 1, pageSize: number = 10, keywords?: string, location?: string) {
    // TheMuse API always returns 20 per page
    const apiPageSize = 20;

    let url = `${this.apiUrl}?api_key=${this.apiKey}&descending=true`;
    
    if (location) {
      url += `&location=${encodeURIComponent(location)}`;
    }

    // If keywords are provided, we fetch multiple pages and filter client-side
    if (keywords && keywords.trim()) {
      const kw = keywords.toLowerCase().trim();
      // Fetch several API pages to have enough data to filter
      const requests = [];
      for (let p = 1; p <= 5; p++) {
        requests.push(this.http.get<TheMuseResponse>(`${url}&page=${p}`));
      }
      return forkJoin(requests).pipe(
        map((responses) => {
          const allJobs = responses.flatMap(res => res.results);
          const totalFromApi = responses[0]?.total ?? 0;

          const filtered = allJobs.filter(job =>
            job.name.toLowerCase().includes(kw) ||
            job.company.name.toLowerCase().includes(kw) ||
            job.categories.some(c => c.name.toLowerCase().includes(kw)) ||
            job.levels.some(l => l.name.toLowerCase().includes(kw))
          );

          const sorted = filtered.sort((a, b) =>
            new Date(b.publication_date).getTime() - new Date(a.publication_date).getTime()
          );

          const start = (page - 1) * pageSize;
          return {
            results: sorted.slice(start, start + pageSize),
            page: page,
            page_count: Math.ceil(sorted.length / pageSize),
            total: sorted.length,
          };
        }),
        catchError((error) => {
          console.error('Error fetching jobs:', error);
          return of({ results: [] as Job[], page: 0, page_count: 0, total: 0 });
        })
      );
    }

    // No keywords: normal paginated fetch
    const apiPage = Math.floor(((page - 1) * pageSize) / apiPageSize) + 1;
    const offsetInPage = ((page - 1) * pageSize) % apiPageSize;

    return this.http
      .get<TheMuseResponse>(`${url}&page=${apiPage}`)
      .pipe(
        map((res) => {
          const sorted = res.results.sort((a, b) => 
            new Date(b.publication_date).getTime() - new Date(a.publication_date).getTime()
          );
          return {
            results: sorted.slice(offsetInPage, offsetInPage + pageSize),
            page: page,
            page_count: Math.ceil(res.total / pageSize),
            total: res.total,
          };
        }),
        catchError((error) => {
          console.error('Error fetching jobs:', error);
          return of({ results: [] as Job[], page: 0, page_count: 0, total: 0 });
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
