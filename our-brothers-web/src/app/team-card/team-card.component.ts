import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss']
})
export class TeamCardComponent implements OnInit {

  @Input() frontImage: string;
  @Input() frontImage2: string;
  @Input() frontName: string;
  @Input() frontTitle: string;
  @Input() frontGender: string;
  @Input() frontBrother: string;
  @Input() frontBrotherAnd: string;
  @Input() frontBrother2: string;
  @Input() frontBrotherLink: string;
  @Input() frontBrother2Link: string;

  constructor(private router: Router) { }

  ngOnInit() { }

  moveToPage() {
    this.router.navigate([this.frontBrotherLink]);
  }

  moveToPage2() {
    this.router.navigate([this.frontBrother2Link]);
  }
}
