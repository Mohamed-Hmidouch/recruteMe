import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

export interface SearchCriteria {
  keywords: string;
  location: string;
}

@Component({
  selector: 'app-job-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './job-search.html',
  styleUrls: ['./job-search.sass'],
})
export class JobSearchComponent implements OnInit {
  @Output() search = new EventEmitter<SearchCriteria>();
  searchForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      keywords: [''],
      location: [''],
    });
  }

  onSearch(): void {
    this.search.emit(this.searchForm.value);
  }
}
