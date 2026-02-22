import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  seatsList: number[] = Array.from({ length: 20 }, (_, i) => i + 1);

  selectedSeats: Set<number> = new Set<number>();
  bookedSeats: Set<number> = new Set<number>();

  trackBySeat(_: number, value: number) {
    return value;
  }

  resetSeats() {
    this.selectedSeats.clear();
  }

  toggleSeat(seatNumber: number) {
    // If seat already booked → do nothing
    if (this.bookedSeats.has(seatNumber)) {
      return;
    }

    // If already selected → deselect
    if (this.selectedSeats.has(seatNumber)) {
      this.selectedSeats.delete(seatNumber);
    }
    // Else select
    else {
      this.selectedSeats.add(seatNumber);
    }
  }

  bookSeats() {
    // Move selected seats to booked
    this.selectedSeats.forEach(seat => {
      this.bookedSeats.add(seat);
    });

    // Clear selected after booking
    this.selectedSeats.clear();
  }

}
