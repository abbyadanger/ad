import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { GlossyEmailInputComponent } from '../glossy-email-input/glossy-email-input.component';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [RouterModule, CommonModule,
    // GlossyEmailInputComponent
  ],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent {
  posts: Post[] = [
  { name: 'Welcome to the blog :O', file:'welcome.md', date: '11.2.25' },

];
  displayedColumns: string[] = ['name', 'date'];
}

export interface Post {
  name: string;
  file: string;
  date: string;
}
