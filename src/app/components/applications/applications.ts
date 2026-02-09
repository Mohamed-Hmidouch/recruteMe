import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationService } from '../../services/application.service';
import { Observable } from 'rxjs';
import { Application, ApplicationStatus } from '../../models/application.model';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './applications.html',
  styleUrls: ['./applications.sass']
})
export class ApplicationsComponent implements OnInit {
  applications$!: Observable<Application[]>;

  constructor(private applicationService: ApplicationService) { }

  ngOnInit(): void {
    this.applications$ = this.applicationService.getApplications();
  }

  removeApplication(applicationId: number): void {
    this.applicationService.removeApplication(applicationId).subscribe(() => {
      this.applications$ = this.applicationService.getApplications();
    });
  }

  updateStatus(application: Application, status: ApplicationStatus): void {
    const updatedApplication = { ...application, status };
    this.applicationService.updateApplication(updatedApplication).subscribe(() => {
      this.applications$ = this.applicationService.getApplications();
    });
  }
}
