import { Component, Input, ChangeDetectionStrategy, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flip-card',
  templateUrl: './flip-card.component.html',
  styleUrls: ['./flip-card.component.scss']
})
export class FlipCardComponent {
  @Input() frontImage: string;
  @Input() frontTitle: string;
  @Input() backText: string;
  @Input() backButtonText: string;
  @Input() backButtonUrl: string;
  @Input() disabled: boolean;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    this.hover = !!this.elementRef.nativeElement.contains(event.target)
  }

  hover = false;

  constructor(
    private elementRef: ElementRef,
    private router: Router
  ) { }

  moveToPage() {
    this.router.navigate([this.backButtonUrl]);
  }
}
