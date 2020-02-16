import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

export interface TeamMember {
  name: string;
  title: string;
  frontImage: string;
  backImage?: string;
  frontGender?: string;
  frontBrother?: string;
  frontBrotherAnd?: string;
  frontBrother2?: string;
  frontBrotherLink?: string;
  frontBrother2Link?: string;
}

@Component({
  selector: 'app-team-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss']
})
export class TeamCardComponent implements OnInit {

  @Input() memeber: TeamMember;

  constructor(private router: Router) { }

  ngOnInit() { }

  moveToPage() {
    this.router.navigate([this.memeber.frontBrotherLink]);
  }

  moveToPage2() {
    this.router.navigate([this.memeber.frontBrother2Link]);
  }
}
