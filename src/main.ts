/* 
  This is the main entry point for the Angular application
  It starts up the App component using the configuration defined in app.config

  Notes:
  - When a user visits my website, this file starts up the App component for client-side rendering (CSR)
*/

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
