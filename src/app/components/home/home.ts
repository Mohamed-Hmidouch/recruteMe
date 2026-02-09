import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobSearchComponent, SearchCriteria } from '../job-search/job-search';
import { JobListComponent } from '../job-list/job-list';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, JobSearchComponent, JobListComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.sass'],
})
export class HomeComponent {
  searchCriteria = signal<SearchCriteria>({ keywords: '', location: '' });

  onSearch(criteria: SearchCriteria): void {
    this.searchCriteria.set(criteria);
  }
}
