/* 
  This is the root Angular component

  Notes:
  - This main component serves as a wrapper for the entire application
*/

import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule],
  template: '<router-outlet></router-outlet>',
})
export class App {
}
