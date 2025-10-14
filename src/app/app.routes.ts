import { Routes } from '@angular/router';
import { BlogListComponent } from './blog-list/blog-list.component';
import { MarkdownViewerComponent } from './markdown-viewer/markdown-viewer.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'blog', component: BlogListComponent },
  { path: 'blog/:file', component: MarkdownViewerComponent },
];
