import { Component, OnInit } from '@angular/core';

import { Meeting } from '../../model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-meetings-page',
  templateUrl: './meetings-page.component.html',
  styleUrls: ['./meetings-page.component.scss']
})
export class MeetingsPageComponent implements OnInit {

  meetings: Meeting[];

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.getMeetings()
      .subscribe((meetings) => {
        this.meetings = meetings;
      });
  }
}
