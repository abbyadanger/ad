/* 
  This component is responsible for displaying markdown content as HTML.
*/
import { Component, Input, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

interface BlogPost {
  id: string;
  filename: string;
  title: string;
  dateFormatted: string;
  slug: string;
  tags: string[];
  published: boolean;
  readTime: number | null;
}

interface BlogData {
  posts: BlogPost[];
}

@Component({
  selector: 'app-markdown-viewer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './markdown-viewer.component.html',
  styleUrls: ['./markdown-viewer.component.css']
})
export class MarkdownViewerComponent implements OnInit {
  filename = signal('');
  html = signal('');
  loading = signal(true);
  error = signal<string | null>(null);
  postMetadata = signal<BlogPost | null>(null);
  title = signal('');

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.filename.set(params.get('file') || '');
      this.loadMarkdown();
    });
  }

  async loadMarkdown() {
    this.loading.set(true);
    this.error.set(null);
    try {
      /* Retrieves blog post metadata from the blog-posts.json file */
      const metadataResponse = await fetch('blog-posts.json', { cache: 'no-cache' });
      if (!metadataResponse.ok) throw new Error(`❌ Failed to load metadata: HTTP ${metadataResponse.status}`);
      
      /* Ensures each post has a slug */
      const blogData: BlogData = await metadataResponse.json();
      const postMeta = blogData.posts.find(post => post.slug === this.filename());
      if (!postMeta) throw new Error(`❌ Post not found: ${this.filename()}`);

      /* Sets variables */
      this.postMetadata.set(postMeta);
      this.title.set(postMeta.title);

      /* Retrieves content from the markdown file */
      const mdResponse = await fetch(`docs/published/${postMeta.filename}`, { cache: 'no-cache' });
      if (!mdResponse.ok) throw new Error(`❌ Failed to load markdown: HTTP ${mdResponse.status}`);
      
      /* Parses content from markdown to a string, then displays as HTML */
      const md = await mdResponse.text();
      const rawHtml = marked.parse(md) as string;
      this.html.set(DOMPurify.sanitize(rawHtml));
      
    } catch (e: any) {
      this.error.set(e.message || '❌ Failed to load markdown');
    } finally {
      this.loading.set(false);
    }
  }
}
