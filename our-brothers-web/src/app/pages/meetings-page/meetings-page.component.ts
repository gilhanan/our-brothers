import { Component } from '@angular/core';

import { DataService } from '../../services/data.service';
import { ViewOptions } from 'src/app/components/view-toggle/view-toggle.component';

@Component({
  selector: 'app-meetings-page',
  templateUrl: './meetings-page.component.html',
  styleUrls: ['./meetings-page.component.scss']
})
export class MeetingsPageComponent {

  view: ViewOptions = 'list';
  user$ = this.dataService.getCurrentUser();
  meetings$ = this.dataService.getMeetings();


  constructor(
    private dataService: DataService
  ) { }
}
