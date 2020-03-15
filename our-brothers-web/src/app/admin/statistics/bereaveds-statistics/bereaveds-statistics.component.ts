import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { User } from 'models';

@Component({
  selector: 'app-bereaveds-statistics',
  templateUrl: './bereaveds-statistics.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./bereaveds-statistics.component.scss']
})
export class BereavedsStatisticsComponent {
  @Input() bereaveds: User[];
}
