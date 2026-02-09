import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngIf

@Component({
  selector: 'app-register',
  standalone: true, // Mark as standalone
  imports: [ReactiveFormsModule, CommonModule], // Add ReactiveFormsModule and CommonModule here
  templateUrl: './register.html',
  styleUrl: './register.sass',
})
export class Register implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Form Submitted!', this.registerForm.value);
      // Here you would typically call an authentication service
    } else {
      console.log('Form is invalid');
      // Mark all fields as touched to display validation messages
      this.registerForm.markAllAsTouched();
    }
  }
}