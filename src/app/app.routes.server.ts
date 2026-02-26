/* 
  This file configures Server-Side Rendering (SRR) for the application
*/

import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**', /* Applies to ALL routes */
    renderMode: RenderMode.Prerender /* Pre-renders the route on the server at build time */
  }
];
