import {
  Component,
  computed,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import {
  addFavorite,
  removeFavorite,
} from '../../store/actions/favorites.actions';
import { selectIsFavorite } from '../../store/selectors/favorites.selectors';
import { ApplicationService } from '../../services/application.service';
import { Job } from '../../models/job.model';
import { AuthService } from '../../services/auth';
import { LucideAngularModule, Heart, Building2, MapPin } from 'lucide-angular';

@Component({
  selector: 'app-job-list-item',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './job-list-item.html',
  styleUrls: ['./job-list-item.sass'],
})
export class JobListItemComponent implements OnInit {
  @Input({ required: true }) job!: Job;

  private authService = inject(AuthService);
  private store = inject(Store<AppState>);
  private applicationService = inject(ApplicationService);

  isLoggedIn = signal(false);
  isFavorite = signal(false);

  postedDate = computed(() => {
    const date = new Date(this.job.publication_date);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days ago`;
  });



  ngOnInit(): void {
    this.isLoggedIn.set(this.authService.isLoggedIn());
    if (this.isLoggedIn()) {
      this.store
        .select(selectIsFavorite(this.job.id.toString()))
        .subscribe((isFav) => this.isFavorite.set(isFav));
    }
  }

  toggleFavorite(): void {
    if (this.isFavorite()) {
      this.store.dispatch(removeFavorite({ jobId: this.job.id.toString() }));
    } else {
      this.store.dispatch(addFavorite({ job: this.job }));
    }
  }

  trackApplication(): void {
    this.applicationService.addApplication(this.job).subscribe();
  }
}
