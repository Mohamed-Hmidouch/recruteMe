import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { Job, TheMuseResponse } from '../models/job.model';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private http = inject(HttpClient);
  private apiUrl = 'https://www.themuse.com/api/public/jobs';
  private apiKey = 'YOUR_API_KEY'; // Replace with your actual API key

  getJobs(page: number = 1, keywords?: string, location?: string) {
    let url = `${this.apiUrl}?api_key=${this.apiKey}&page=${page}`;
    
    if (keywords) {
      url += `&category=${encodeURIComponent(keywords)}`;
    }
    if (location) {
      url += `&location=${encodeURIComponent(location)}`;
    }
    
    return this.http
      .get<TheMuseResponse>(url)
      .pipe(map((res) => res.results));
  }

  getJob(id: number) {
    return this.http
      .get<Job>(`${this.apiUrl}/${id}?api_key=${this.apiKey}`);
  }
}
