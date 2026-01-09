import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-film',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
