import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TeamMember } from '../team-card/team-card.component';
import { members } from './members';

@Component({
  selector: 'app-team-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss']
})
export class TeamPageComponent {
  members: TeamMember[] = members;
}
