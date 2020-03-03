import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-agenda-page',
  templateUrl: './agenda-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./agenda-page.component.scss']
})
export class AgendaPageComponent {}
