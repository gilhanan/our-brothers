import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';

import { Meeting } from 'models';

interface MeetingStatistics {
  count: number;
  registered: number;
}

interface YearlyMeetingsStatistics {
  year: number;
  meetingStatistics: MeetingStatistics;
}

@Component({
  selector: 'app-meetings-statistics',
  templateUrl: './meetings-statistics.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./meetings-statistics.component.scss']
})
export class MeetingsStatisticsComponent {
  yearlyMeetingsStatistics: YearlyMeetingsStatistics[];
  total: number = 0;

  @Input()
  set meetings(meetings: Meeting[]) {
    this.yearlyMeetingsStatistics = this.calcYearlyMeetingsStatistics(meetings);
  }

  calcYearlyMeetingsStatistics(meetings: Meeting[]): YearlyMeetingsStatistics[] {
    const yearlyMeetingsStatisticsMap: {
      [year: number]: MeetingStatistics;
    } = {};

    for (const meeting of meetings) {
      const year = new Date(meeting.date).getFullYear();

      this.total++;

      yearlyMeetingsStatisticsMap[year] = yearlyMeetingsStatisticsMap[year] || {
        count: 0,
        registered: 0
      };

      yearlyMeetingsStatisticsMap[year].count++;

      if (meeting.bereaved) {
        yearlyMeetingsStatisticsMap[year].registered++;
      }
    }

    return Object.keys(yearlyMeetingsStatisticsMap)
      .map(year => ({
        year: Number.parseInt(year),
        meetingStatistics: yearlyMeetingsStatisticsMap[year]
      }))
      .sort((a, b) => b.year - a.year);
  }
}
