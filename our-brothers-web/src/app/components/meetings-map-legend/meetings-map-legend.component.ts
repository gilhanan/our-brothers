import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { User, UserRole } from '../../../app/model';

interface Legend {
  label: string;
  iconUrl: string;
}

@Component({
  selector: 'app-meetings-map-legend',
  templateUrl: './meetings-map-legend.component.html',
  styleUrls: ['./meetings-map-legend.component.scss']
})
export class MeetingsMapLegendComponent implements OnChanges {

  @Input() user: User;

  legends: Legend[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    const isBereaved = this.user && this.user.role === UserRole.bereaved;

    this.legends = [{
      label: `אדום - ${isBereaved ? 'אח/ות משובץ' : 'תפוסה מלאה'}`,
      iconUrl: '/assets/img/map/meetings-map-red.svg'
    }]

    if (!isBereaved) {
      this.legends.push({
        label: 'אפור - סגור למוזמנים בלבד',
        iconUrl: '/assets/img/map/meetings-map-grey.svg'
      });
    }

    this.legends.push({
      label: `ירוק - ${isBereaved ? 'פנוי' : 'פתוח לקהל'}`,
      iconUrl: '/assets/img/map/meetings-map-green.svg'
    }, {
      label: 'כחול - השיבוץ שלי',
      iconUrl: '/assets/img/map/meetings-map-blue.svg'
    });
  }
}
