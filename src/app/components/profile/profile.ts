import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.sass']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  user!: User | null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.profileForm = this.fb.group({
      name: [this.user?.name, Validators.required],
      firstName: [this.user?.firstName, Validators.required],
      email: [this.user?.email, [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]]
    });
  }

  updateProfile(): void {
    if (this.profileForm.valid && this.user) {
      const updatedUser = { ...this.user, ...this.profileForm.value };
      // Remove password if empty (user didn't want to change it)
      if (!updatedUser.password) {
        updatedUser.password = this.user.password;
      }
      this.authService.updateUser(updatedUser).subscribe({
        next: (user) => {
          this.user = user;
          alert('Profile updated successfully!');
        },
        error: (err) => {
          console.error('Error updating profile:', err);
          alert('Failed to update profile. Please try again.');
        }
      });
    }
  }

  deleteAccount(): void {
    if (this.user && confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      this.authService.deleteUser(this.user.id!).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error deleting account:', err);
          alert('Failed to delete account. Please try again.');
        }
      });
    }
  }
}
