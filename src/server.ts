/* 
  This file handles Angular Server-Side Rendering (SSR) using Express.js

  Notes:
  - It serves static files from the /browser directory & renders the Angular application for all other routes
  - It also includes an API endpoint to list markdown files in the public/docs/published directory
*/

import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

import fs from 'fs';
import path from 'path';

/* API endpoint to get list of markdown files in public/docs/published */
app.get('/api/docs-list', (req, res) => {
  const docsDir = path.join(import.meta.dirname, '../public/docs/published');
  fs.readdir(docsDir, (err, files) => {
    if (err) return res.status(500).json({ error: 'Failed to read docs directory' });
    const mdFiles = files.filter(f => f.endsWith('.md')).map(f => `docs/published/${f}`);
    res.json(mdFiles);
  });
});

/* Serve static files from /browser */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/* Handle all other routes by rendering the Angular application */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/* Starts the Express server ONLY when this file is run directly (not when imported) */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }
    console.log(`✅ Node Express server listening on http://localhost:${port}`);
  });
}

/* Export the request handler so it can be used by the Angular CLI (for dev-server and during build)
  or for Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
