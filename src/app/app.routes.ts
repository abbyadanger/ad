/* 
  This files defines the routes and their corresponding components
*/

import { Routes } from '@angular/router';
import { MeComponent } from './me/me.component';
import { WorkComponent } from './work/work.component';
import { FilmComponent } from './film/film.component';
import { DipDecisionComponent } from './work/dip-decision/dip-decision.component';

export const routes: Routes = [
  { path: '', redirectTo: 'me', pathMatch: 'full' },
  { path: 'me', component: MeComponent },
  { path: 'work', component: WorkComponent },
  { path: 'work/dip-decision', component: DipDecisionComponent },
  { path: 'film', component: FilmComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
