import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent {
  posts: Post[] = [
  { name: 'Hello', file:'hello.md', date: '12.29.24' },
  { name: 'Who am I?', file:'abby.md', date: '2.3.25' },
  { name: 'Deep Dive Into JavaScript', file:'deep-dive-into-javascript.md', date: '10.14.25' },

];
  displayedColumns: string[] = ['name', 'date'];
}

export interface Post {
  name: string;
  file: string;
  date: string;
}
