import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { User } from 'models';
import { MEMORIAL_YEAR } from 'src/app/shared/constants';

interface BereavedStatistics {
  count: number;
  registered: number;
}

@Component({
  selector: 'app-bereaveds-statistics',
  templateUrl: './bereaveds-statistics.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./bereaveds-statistics.component.scss']
})
export class BereavedsStatisticsComponent {
  bereavedsStatistics: BereavedStatistics;

  @Input()
  set bereaveds(bereaveds: User[]) {
    this.bereavedsStatistics = this.calcBereavedsStatistics(bereaveds);
  }

  calcBereavedsStatistics(bereaveds: User[]): BereavedStatistics {
    const bereavedsStatistics: BereavedStatistics = {
      count: 0,
      registered: 0
    };

    const current = new Date(MEMORIAL_YEAR, 1, 1).getTime();

    for (const bereaved of bereaveds) {
      if (bereaved.lastSignInDate >= current) {
        bereavedsStatistics.count++;
        if (bereaved.bereavedParticipation && bereaved.bereavedParticipation[MEMORIAL_YEAR]?.meetings?.length) {
          bereavedsStatistics.registered++;
        }
      }
    }

    return bereavedsStatistics;
  }
}
