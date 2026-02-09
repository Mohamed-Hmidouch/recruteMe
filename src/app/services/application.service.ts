import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';
import { Application } from '../models/application.model';
import { Job } from '../models/job.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private apiUrl = 'http://localhost:3000/applications';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getApplications(): Observable<Application[]> {
    const user = this.authService.getCurrentUser();
    return this.http.get<Application[]>(`${this.apiUrl}?userId=${user?.id}`);
  }

  addApplication(job: Job): Observable<Application> {
    const user = this.authService.getCurrentUser();
    const application: Omit<Application, 'id'> = {
      offerId: job.id,
      userId: user?.id!,
      apiSource: 'themuse',
      title: job.name,
      company: job.company.name,
      location: job.locations[0]?.name || 'Remote',
      url: job.refs.landing_page,
      status: 'en_attente',
      notes: '',
      dateAdded: new Date().toISOString()
    };
    return this.http.post<Application>(this.apiUrl, application);
  }

  removeApplication(applicationId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${applicationId}`);
  }

  updateApplication(application: Application): Observable<Application> {
    return this.http.put<Application>(`${this.apiUrl}/${application.id}`, application);
  }
}
