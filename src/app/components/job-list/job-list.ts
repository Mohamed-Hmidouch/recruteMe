import { Component, inject, OnInit, signal, Input, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobListItemComponent } from '../job-list-item/job-list-item';
import { JobService } from '../../services/job.service';
import { Job } from '../../models/job.model';
import { SearchCriteria } from '../job-search/job-search';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, JobListItemComponent],
  templateUrl: './job-list.html',
  styleUrls: ['./job-list.sass'],
})
export class JobListComponent implements OnInit {
  private jobService = inject(JobService);

  @Input() searchCriteria = signal<SearchCriteria>({ keywords: '', location: '' });

  jobs = signal<Job[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor() {
    effect(() => {
      const criteria = this.searchCriteria();
      this.loadJobs(criteria.keywords, criteria.location);
    });
  }

  ngOnInit() {
    this.loadJobs();
  }

  loadJobs(keywords?: string, location?: string) {
    this.loading.set(true);
    this.error.set(null);
    this.jobService.getJobs(1, keywords, location).subscribe({
      next: (jobs) => {
        this.jobs.set(jobs);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message || 'Failed to load jobs');
        this.loading.set(false);
      },
    });
  }
}
