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
    <!-- Initial subscribe button -->
    <div *ngIf="!showInputField && !showSuccessMessage" class="initial-button-container">
      <button 
        type="button" 
        class="glossy-submit-arrow" 
        (click)="showInput()"
        aria-label="Show email input">
        subscribe <span class="material-icons">notifications</span>
      </button>
    </div>

    <!-- Email form with input -->
    <form class="email-form" (ngSubmit)="onSubmit($event)" *ngIf="showInputField && !showSuccessMessage">
      <div class="input-container">
        <input
          type="email"
          class="glossy-email-input"
          [(ngModel)]="email"
          placeholder="enter email address"
          name="email"
          #emailInput
          required
        >
        <button 
          type="submit" 
          class="glossy-submit-inside" 
          aria-label="Submit email">
          <span class="material-icons">arrow_forward</span>
        </button>
      </div>
    </form>

    <!-- Success message -->
    <div *ngIf="showSuccessMessage" class="success-message" (click)="resetForm()">
      <span class="material-icons">check_circle</span> subscribed
    </div>
  `,
})
export class GlossyEmailInputComponent {
  @Input() placeholder: string = 'enter email address';
  @Output() emailSubmitted = new EventEmitter<string>();

  email: string = '';
  showSuccessMessage: boolean = false;
  showInputField: boolean = false;

  constructor(private supabaseService: SupabaseService) {}

  showInput() {
    this.showInputField = true;
    // Focus the input field after it appears
    setTimeout(() => {
      const input = document.querySelector('.glossy-email-input') as HTMLInputElement;
      if (input) {
        input.focus();
      }
    }, 100);
  }

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
  }

  resetForm() {
    this.showSuccessMessage = false;
    this.showInputField = false;
    this.email = '';
  }
}