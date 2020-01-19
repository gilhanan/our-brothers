import { Component, OnInit } from '@angular/core';

type GuideStage = 'first' | 'second' | 'third';

@Component({
  selector: 'app-meetings-map-guide',
  templateUrl: './meetings-map-guide.component.html',
  styleUrls: ['./meetings-map-guide.component.scss']
})
export class MeetingsMapGuideComponent {

  stage = 0;

  stages = [
    'בסיום הבחירה לחצ/י על כפתור "שיבוץ"',
    'ברשותך אפשרות לחיפוש ידני מתחת',
    'בחר/י את האזור הרצוי - מרכז, צפון ודרום'
  ];

  started = false;

  next() {
    if (this.stage < this.stages.length - 1) {
      this.stage++;
    }
  }

  prev() {
    if (this.stage > 0) {
      this.stage--;
    }
  }
}
