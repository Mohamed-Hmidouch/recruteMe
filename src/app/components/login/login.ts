import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngIf

@Component({
  selector: 'app-login',
  standalone: true, // Mark as standalone
  imports: [ReactiveFormsModule, CommonModule], // Add ReactiveFormsModule and CommonModule here
  templateUrl: './login.html',
  styleUrl: './login.sass',
})
export class Login implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Form Submitted!', this.loginForm.value);
      // Here you would typically call an authentication service
    } else {
      console.log('Form is invalid');
      // Mark all fields as touched to display validation messages
      this.loginForm.markAllAsTouched();
    }
  }
}