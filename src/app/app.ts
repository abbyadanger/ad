/* 
  This is the root Angular component

  Notes:
  - This main component serves as a wrapper for the entire application
*/

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: '<app-header></app-header><router-outlet></router-outlet><app-footer></app-footer>',
})
export class App {
}
