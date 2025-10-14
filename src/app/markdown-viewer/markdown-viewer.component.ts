import { Component, Input, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

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
      const getMdContents = await fetch(`/docs/${this.filename()}`, { cache: 'no-cache' }); // Get markdown contents
      if (!getMdContents.ok) throw new Error(`HTTP ${getMdContents.status}`);
      const md = await getMdContents.text(); // Translate to english
      const rawHtml = marked.parse(md) as string; // Make string
      this.html.set(DOMPurify.sanitize(rawHtml)); // Assign to html
    } catch (e: any) {
      this.error.set(e.message || 'Failed to load markdown');
    } finally {
      this.loading.set(false);
    }
  }
}
