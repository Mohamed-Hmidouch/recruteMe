import { Component, inject, OnInit, signal, Input, computed, SimpleChanges, OnChanges } from '@angular/core';
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
export class JobListComponent implements OnInit, OnChanges {
  private jobService = inject(JobService);

  @Input() searchCriteria: SearchCriteria = { keywords: '', location: '' };

  jobs = signal<Job[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  currentPage = signal(1);
  totalPages = signal(0);
  totalJobs = signal(0);
  pageSize = 10;

  private currentKeywords?: string;
  private currentLocation?: string;

  visiblePages = computed(() => {
    const current = this.currentPage();
    const total = this.totalPages();
    const pages: number[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);
      if (current > 3) pages.push(-1);
      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (current < total - 2) pages.push(-1);
      pages.push(total);
    }
    return pages;
  });

  ngOnInit() {
    this.loadJobs();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchCriteria'] && !changes['searchCriteria'].firstChange) {
      const criteria = changes['searchCriteria'].currentValue as SearchCriteria;
      this.currentPage.set(1);
      this.loadJobs(1, criteria.keywords, criteria.location);
    }
  }

  loadJobs(page: number = 1, keywords?: string, location?: string) {
    this.loading.set(true);
    this.error.set(null);
    this.currentKeywords = keywords;
    this.currentLocation = location;
    this.jobService.getJobs(page, this.pageSize, keywords, location).subscribe({
      next: (response) => {
        this.jobs.set(response.results);
        this.currentPage.set(response.page);
        this.totalPages.set(response.page_count);
        this.totalJobs.set(response.total);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message || 'Failed to load jobs');
        this.loading.set(false);
      },
    });
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages() || page === this.currentPage()) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.loadJobs(page, this.currentKeywords, this.currentLocation);
  }

  nextPage() {
    this.goToPage(this.currentPage() + 1);
  }

  prevPage() {
    this.goToPage(this.currentPage() - 1);
  }
}
