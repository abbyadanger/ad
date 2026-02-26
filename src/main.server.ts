/* 
    This file handles the server-side rendering (SSR) of the Angular application,
    using the configuration defined in app.config.server

    Notes:
    - When the server needs to pre-render pages for SSR, this file starts up the App for SSR
*/

import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { config } from './app/app.config.server';

const bootstrap = (context: BootstrapContext) =>
    bootstrapApplication(App, config, context);

export default bootstrap;
