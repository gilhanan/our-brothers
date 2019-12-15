import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-flip-card',
  templateUrl: './flip-card.component.html',
  styleUrls: ['./flip-card.component.scss']
})
export class FlipCardComponent implements OnInit {
  @Input() frontImage: string;
  @Input() frontTitle: string;
  @Input() backText: string;
  @Input() backButtonText: string;
  @Input() backButtonUrl: string;

  constructor() {}

  ngOnInit() {}
}
