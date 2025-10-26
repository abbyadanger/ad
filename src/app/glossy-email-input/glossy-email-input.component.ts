import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-glossy-email-input',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form class="email-form">
      <div class="glossy-input-container">
        <input
          type="email"
          class="glossy-email-input"
          placeholder="enter your email ... if you want"
        >
        <button type="submit" class="glossy-submit-arrow" aria-label="Submit email">
          →
        </button>
      </div>
    </form>
  `,
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
      width: 50%;
    }

    .glossy-email-input {
      flex: 1;
      padding: 8px 12px;
      padding-right: 35px; /* Make room for the smaller submit button */
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

    /* Glossy Submit Arrow Button */
    .glossy-submit-arrow {
      position: absolute;
      right: 4px;
      top: 50%;
      transform: translateY(-50%);
      width: 24px;
      height: 24px;
      border: none;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.4);
      color: #FFFFFF;
      font-size: 12px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 
        0 2px 8px rgba(0, 0, 0, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
    }

    .glossy-submit-arrow:hover {
      background: rgba(255, 255, 255, 0.35);
      border: 1px solid rgba(255, 255, 255, 0.6);
      transform: translateY(-50%) scale(1.05);
      box-shadow: 
        0 3px 12px rgba(0, 0, 0, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.5);
    }

    .glossy-submit-arrow:active {
      transform: translateY(-50%) scale(0.95);
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
  `]
})
export class GlossyEmailInputComponent {
}