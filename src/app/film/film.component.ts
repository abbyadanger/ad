/*
  This component displays the film images in a photo grid

  Notes:
  - It fetches a list of image filenames from a JSON file and displays them in a grid
*/
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
    /* Retrieve list of filenames from JSON file */
    this.http.get<string[]>('./film-list.json').subscribe({
      next: (filenames) => {
        this.filenames = this.randomizeOrder(filenames); /* Randomize the order of photos */
        console.log(`✅ Loaded ${this.filenames.length} film images`);
        this.cdr.detectChanges(); /* Force change detection */
      },
      error: (error) => {
        console.error('❌ Error loading film list:', error);
        console.error('❌ Tried to load: ./film-list.json');
        this.filenames = []; /* Clear filenames on error */
        this.cdr.detectChanges(); /* Force change detection */
      }
    });
  }

  /* Method that randomizes the order of an array */
  private randomizeOrder(array: string[]): string[] {
    return [...array].sort(() => Math.random() - 0.5);
  }

  /* Method to open an image in the modal */
  openImage(filename: string): void {
    this.selectedImage = filename;
    this.currentIndex = this.filenames.indexOf(filename);
  }

  /* Method to close the image modal */
  closeImage(): void {
    this.selectedImage = null;
  }

  /* Method to go to the next image in the modal */
  nextImage(): void {
    if (this.filenames.length === 0) return;
    this.currentIndex = (this.currentIndex + 1) % this.filenames.length;
    this.selectedImage = this.filenames[this.currentIndex];
  }

  /* Method to go to the previous image in the modal */
  previousImage(): void {
    if (this.filenames.length === 0) return;
    this.currentIndex = this.currentIndex === 0 ? this.filenames.length - 1 : this.currentIndex - 1;
    this.selectedImage = this.filenames[this.currentIndex];
  }

  /* Method to get the image path */
  getImagePath(filename: string): string {
    return this.filmURLPath + filename;
  }

  /* Method to get the current image number for display */
  getCurrentImageNumber(): string {
    return `${this.currentIndex + 1} of ${this.filenames.length}`;
  }

  /* Keyboard Navigation w/ Arrow Keys */
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
}
