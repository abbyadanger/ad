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
  readTime = signal('');
  
  // Metadata from JSON
  postMetadata = signal<BlogPost | null>(null);
  title = signal('');
  date = signal('');
  tags = signal<string[]>([]);

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
      // First load metadata to find the filename from the slug
      const metadataResponse = await fetch('blog-posts.json', { cache: 'no-cache' });
      if (!metadataResponse.ok) throw new Error(`Failed to load metadata: HTTP ${metadataResponse.status}`);

      const blogData: BlogData = await metadataResponse.json();

      // Find the post metadata by slug (the filename() is actually the slug now)
      const postMeta = blogData.posts.find(post => post.slug === this.filename());
      if (!postMeta) throw new Error(`Post not found: ${this.filename()}`);

      // Set metadata
      this.postMetadata.set(postMeta);
      this.title.set(postMeta.title);
      this.date.set(postMeta.dateFormatted);
      this.tags.set(postMeta.tags);

      // Now load the markdown file using the actual filename
      const mdResponse = await fetch(`docs/published/${postMeta.filename}`, { cache: 'no-cache' });
      if (!mdResponse.ok) throw new Error(`HTTP ${mdResponse.status}`);

      const md = await mdResponse.text();

      // Process markdown
      const rawHtml = marked.parse(md) as string;
      this.html.set(DOMPurify.sanitize(rawHtml));
      
      // Calculate read time
      this.calculateReadTime(md);
    } catch (e: any) {
      this.error.set(e.message || 'Failed to load markdown');
    } finally {
      this.loading.set(false);
    }
  }

  private calculateReadTime(markdownText: string) {
    // Remove markdown syntax for more accurate word count
    const cleanText = markdownText
      .replace(/```[\s\S]*?```/g, ' ') // Remove code blocks
      .replace(/`[^`]*`/g, ' ') // Remove inline code
      .replace(/!\[.*?\]\(.*?\)/g, ' ') // Remove images
      .replace(/\[.*?\]\(.*?\)/g, ' ') // Remove links
      .replace(/#{1,6}\s*/g, ' ') // Remove headers
      .replace(/[*_~`]/g, ' ') // Remove formatting characters
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
    
    // Count words
    const words = cleanText.split(' ').filter(word => word.length > 0);
    const wordCount = words.length;
    
    // Calculate read time (average 200 words per minute)
    const wordsPerMinute = 200;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    
    // Format read time
    if (minutes === 1) {
      this.readTime.set('1 min read');
    } else if (minutes < 60) {
      this.readTime.set(`${minutes} min read`);
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      this.readTime.set(`${hours}h ${remainingMinutes}m read`);
    }
  }
}
