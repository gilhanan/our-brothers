import { Component, Input, ChangeDetectionStrategy, ElementRef, HostListener, OnInit } from '@angular/core';

export interface TeamMember {
  name: string;
  title: string;
  frontImage: string;
  backImage?: string;
  slains?: TeamMemberSlain[]
}

interface TeamMemberSlain {
  pre: string;
  title: string;
  link: string;
}

@Component({
  selector: 'app-team-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss']
})
export class TeamCardComponent implements OnInit {

  @Input() member: TeamMember;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    this.hover = !!this.elementRef.nativeElement.contains(event.target)
  }

  public hover: boolean;

  public slains: number = 0;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.slains = this.member.slains && this.member.slains.length;
  }
}
