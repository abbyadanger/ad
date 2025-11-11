import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GlossyEmailInputComponent } from '../glossy-email-input/glossy-email-input.component';

export interface BlogData {
  posts: {
    id: string;
    filename: string;
    title: string;
    dateFormatted: string;
    slug: string;
    tags: string[];
    published: boolean;
    readTime: number | null;
  }[];
}

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [RouterModule, CommonModule, GlossyEmailInputComponent],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  posts = signal<BlogData['posts']>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  async ngOnInit() {
    await this.loadBlogPosts();
  }

  private async loadBlogPosts() {
    this.loading.set(true);
    this.error.set(null);
    
    try {
      // Get metadata
      const response = await fetch('blog-posts.json', { cache: 'no-cache' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const blogData: BlogData = await response.json();
      
      // Filter for published posts & sort by date (newest first)
      const publishedPosts = blogData.posts
        .filter(post => post.published)
        .sort((a, b) => new Date(b.dateFormatted).getTime() - new Date(a.dateFormatted).getTime());
      
      this.posts.set(publishedPosts);
    } catch (e: any) {
      this.error.set(e.message || 'Failed to load blog posts');
    } finally {
      this.loading.set(false);
    }
  }
}
