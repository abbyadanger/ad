import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-glossy-email-input',
  standalone: true,
  imports: [FormsModule, CommonModule],
  styles: [`
    /* Glossy Email Input Styling */
    .email-form {
      margin: 20px 0;
      display: flex;
      justify-content: center;
    }

    .glossy-input-container {
      position: relative;
      display: flex;
      align-items: center;
      margin: 0 auto;
      width: 65%;
    }

    .glossy-email-input {
      flex: 1;
      padding: 8px 12px;
      padding-right: 95px; /* Make room for the Subscribe button */
      border: none;
      border-radius: 15px;
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: #FFFFFF;
      font-size: 12px;
      font-family: inherit;
      outline: none;
      transition: all 0.3s ease;
      box-shadow: 
        0 4px 16px rgba(0, 0, 0, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.4);
    }

    .glossy-email-input::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }

    .glossy-email-input:focus {
      background: rgba(255, 255, 255, 0.25);
      border: 1px solid rgba(255, 255, 255, 0.5);
      box-shadow: 
        0 4px 16px rgba(0, 0, 0, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.6),
        0 0 0 2px rgba(255, 255, 255, 0.1);
      transform: translateY(-1px);
    }

    .glossy-email-input:hover {
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.4);
    }

    /* Fix autofill styling - Chrome/Safari */
    .glossy-email-input:-webkit-autofill,
    .glossy-email-input:-webkit-autofill:hover,
    .glossy-email-input:-webkit-autofill:focus,
    .glossy-email-input:-webkit-autofill:active {
      -webkit-text-fill-color: #FFFFFF !important;
      -webkit-box-shadow: 0 0 0 1000px rgba(255, 255, 255, 0.15) inset !important;
      background: rgba(255, 255, 255, 0.15) !important;
      border: 1px solid rgba(255, 255, 255, 0.3) !important;
      border-radius: 15px !important;
      backdrop-filter: blur(10px) !important;
      -webkit-backdrop-filter: blur(10px) !important;
      font-family: inherit !important;
      font-size: 12px !important;
      transition: background-color 5000s ease-in-out 0s !important;
    }

    /* Fix autofill styling - Firefox */
    .glossy-email-input:-moz-autofill {
      background: rgba(255, 255, 255, 0.15) !important;
      color: #FFFFFF !important;
      border: 1px solid rgba(255, 255, 255, 0.3) !important;
      border-radius: 15px !important;
      font-family: inherit !important;
      font-size: 12px !important;
    }

    /* Glossy Submit Button */
    .glossy-submit-arrow {
      position: absolute;
      right: 1px;
      top: 1px;
      bottom: 1px;
      width: auto;
      min-width: 80px;
      border: none;
      border-radius: 0 14px 14px 0;
      background: rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.4);
      color: #FFFFFF;
      font-size: 11px;
      font-weight: bold;
      font-family: inherit;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 12px;
      box-shadow: 
        0 2px 8px rgba(0, 0, 0, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
    }

    .glossy-submit-arrow:hover {
      background: rgba(255, 255, 255, 0.35);
      border: 1px solid rgba(255, 255, 255, 0.6);
      transform: scale(1.02);
      box-shadow: 
        0 3px 12px rgba(0, 0, 0, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.5);
    }

    .glossy-submit-arrow:active {
      transform: scale(0.98);
      box-shadow: 
        0 2px 8px rgba(0, 0, 0, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.4);
    }

    .glossy-submit-arrow:focus {
      outline: none;
      box-shadow: 
        0 3px 12px rgba(0, 0, 0, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.5),
        0 0 0 2px rgba(255, 255, 255, 0.2);
    }

    /* Button fade-out animation */
    .glossy-submit-arrow.fade-out {
      opacity: 0;
      transform: scale(0.8);
      pointer-events: none;
      transition: opacity 0.4s ease, transform 0.4s ease;
    }
  `],
  template: `
    <form class="email-form" (ngSubmit)="onSubmit($event)">
      <div class="glossy-input-container">
        <input
          type="email"
          class="glossy-email-input"
          [ngModel]="showSuccessMessage ? '😎😎😎 thanks! 😎😎😎' : email"
          (ngModelChange)="onEmailChange($event)"
          [placeholder]="showSuccessMessage ? '' : 'enter your email'"
          [readonly]="showSuccessMessage"
          name="email"
          required
        >
        <button 
          type="submit" 
          class="glossy-submit-arrow" 
          [class.fade-out]="showSuccessMessage" 
          aria-label="Submit email">
          subscribe
        </button>
      </div>
    </form>
  `,
})
export class GlossyEmailInputComponent {
  @Input() placeholder: string = 'enter your email';
  @Output() emailSubmitted = new EventEmitter<string>();

  email: string = '';
  showSuccessMessage: boolean = false;

  onEmailChange(value: string) {
    if (!this.showSuccessMessage) {
      this.email = value;
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    
    if (!this.email.trim()) {
      return;
    }

    // Store email before showing success message
    const submittedEmail = this.email;
    
    // Show success message immediately
    this.showSuccessMessage = true;
    this.emailSubmitted.emit(submittedEmail);

    // Reset after 4 seconds
    setTimeout(() => {
      this.showSuccessMessage = false;
      this.email = '';
    }, 4000);
  }
}