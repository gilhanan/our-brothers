import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';

import { Meeting } from 'models';

@Component({
  selector: 'app-meetings-statistics',
  templateUrl: './meetings-statistics.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./meetings-statistics.component.scss']
})
export class MeetingsStatisticsComponent {
  @Input() meetings: Meeting[];
}
