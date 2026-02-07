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

  // NEW: keep track of currently selected seats and booked seats.
  // We use Set<number> for O(1) add/delete/has checks.
  selectedSeats: Set<number> = new Set<number>();
  bookedSeats: Set<number> = new Set<number>();

  // Helper: handle seat click
  // - if seat is already booked => ignore
  // - otherwise toggle selection
  onSeatClick(seatNumber: number): void {
    if (this.bookedSeats.has(seatNumber)) {
      // Already booked -> ignore click (no state change)
      return;
    }

    if (this.selectedSeats.has(seatNumber)) {
      this.selectedSeats.delete(seatNumber);
    } else {
      this.selectedSeats.add(seatNumber);
    }
  }

  // Book currently selected seats
  // Move all from selectedSeats -> bookedSeats, then clear selection
  bookSelectedSeats(): void {
    for (const s of Array.from(this.selectedSeats)) {
      this.bookedSeats.add(s);
    }
    this.selectedSeats.clear();
  }

  // Reset only selection (selected -> normal). Do NOT clear booked seats.
  resetSelection(): void {
    this.selectedSeats.clear();
  }

  // Optional: a trackBy for ngFor performance if the grid grows later
  trackBySeat(_: number, value: number) {
    return value;
  }

}
