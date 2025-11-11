import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-glossy-email-input',
  standalone: true,
  imports: [FormsModule, CommonModule],
  styleUrl: './glossy-email-input.component.css',
  template: `
    <form class="email-form" (ngSubmit)="onSubmit($event)" *ngIf="!showSuccessMessage">
      <input
        type="email"
        class="glossy-email-input"
        [(ngModel)]="email"
        placeholder="enter your email"
        name="email"
        required
      >
      <button 
        type="submit" 
        class="glossy-submit-arrow" 
        aria-label="Submit email">
        subscribe
      </button>
    </form>
    <div *ngIf="showSuccessMessage" class="success-message">
      ✓ Thank you for subscribing!
    </div>
  `,
})
export class GlossyEmailInputComponent {
  @Input() placeholder: string = 'enter your email';
  @Output() emailSubmitted = new EventEmitter<string>();

  email: string = '';
  showSuccessMessage: boolean = false;

  constructor(private supabaseService: SupabaseService) {}

  async onSubmit(event: Event) {
    event.preventDefault();
    
    // Don't submit if email is empty
    if (!this.email.trim()) {
      return;
    }

    // Show success message immediately
    this.showSuccessMessage = true;
    // Save email to database in background (don't wait)
    this.supabaseService.addEmailToDatabase(this.email);
    // Reset form after 3 seconds
    setTimeout(() => {
      this.showSuccessMessage = false;
      this.email = '';
    }, 3000);
  }
}