import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Hero } from '../../models/hero.model';

@Component({
  selector: 'app-hero-modal',
  imports: [ MatButtonModule ],
  templateUrl: './hero-modal.component.html',
  styleUrl: './hero-modal.component.scss',
  standalone: true,
})
export class HeroModalComponent {
  @Input() heroData: Hero | null = null;

  @Output() closeModal = new EventEmitter<boolean>();

  close(value: boolean) {
    this.closeModal.emit(value);
  }
}
