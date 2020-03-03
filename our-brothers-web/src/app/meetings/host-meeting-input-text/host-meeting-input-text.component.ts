import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-host-meeting-input-text',
  templateUrl: './host-meeting-input-text.component.html',
  styleUrls: ['./host-meeting-input-text.component.scss']
})
export class HostMeetingInputTextComponent{
  @Input() iconUrl: string;
  @Input() label: string;
  @Input() text: string;
  @Input() info: string;
}
