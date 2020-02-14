import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flip-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  constructor(private router: Router) { }

  moveToPage() {
    this.router.navigate([this.backButtonUrl]);
  }
}
