import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  // CommonModule: ✅ enables *ngFor, *ngIf, pipes etc.
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ticket-booking-system');

  sections = [0, 1, 2];

  seatsPerSection = 18;

  // 1 → 18 (base seats per section)
  seatArray: number[] = Array.from({ length: this.seatsPerSection }, (_, i) => i + 1);
}
