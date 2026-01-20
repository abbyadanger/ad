import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, HostListener, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-film',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {

  filenames: string[] = [];
  selectedImage: string | null = null;
  currentIndex: number = 0;
  filmURLPath = '/docs/pics/film/';

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    // Retrieve list of filenames for pictures
    this.http.get<string[]>('./film-list.json').subscribe({
      next: (filenames) => {
        console.log('Raw filenames received:', filenames);
        this.filenames = this.randomizeOrder(filenames);
        console.log(`Loaded ${this.filenames.length} film images`);
        console.log('Filenames array:', this.filenames);
        this.cdr.detectChanges(); // Force change detection
      },
      error: (error) => {
        console.error('Error loading film list:', error);
        console.error('Tried to load: ./film-list.json');
        this.filenames = [];
        this.cdr.detectChanges();
      }
    });
  }

  private randomizeOrder(array: string[]): string[] {
    return [...array].sort(() => Math.random() - 0.5);
  }

  openImage(filename: string): void {
    this.selectedImage = filename;
    this.currentIndex = this.filenames.indexOf(filename);
  }

  closeImage(): void {
    this.selectedImage = null;
  }

  nextImage(): void {
    if (this.filenames.length === 0) return;
    this.currentIndex = (this.currentIndex + 1) % this.filenames.length;
    this.selectedImage = this.filenames[this.currentIndex];
  }

  previousImage(): void {
    if (this.filenames.length === 0) return;
    this.currentIndex = this.currentIndex === 0 ? this.filenames.length - 1 : this.currentIndex - 1;
    this.selectedImage = this.filenames[this.currentIndex];
  }

  getImagePath(filename: string): string {
    return this.filmURLPath + filename;
  }

  // Keyboard navigation
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (!this.selectedImage) return;
    
    switch (event.key) {
      case 'ArrowLeft':
        this.previousImage();
        break;
      case 'ArrowRight':
        this.nextImage();
        break;
      case 'Escape':
        this.closeImage();
        break;
    }
  }

  getCurrentImageNumber(): string {
    return `${this.currentIndex + 1} of ${this.filenames.length}`;
  }
}
