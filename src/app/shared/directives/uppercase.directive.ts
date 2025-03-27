import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appToUpperCase]',
  standalone: true
})
export class UppercaseDirective {

  constructor(private el: ElementRef<HTMLInputElement>) {
    this.transformText();
  }

  @HostListener('input') onInput(): void {
    this.transformText();
  }

  private transformText(): void {
    const input = this.el.nativeElement;
    const upperValue = input.value.toUpperCase();
    if (input.value !== upperValue) {
      input.value = upperValue;
      input.dispatchEvent(new Event('input'));
    }
  }
}
