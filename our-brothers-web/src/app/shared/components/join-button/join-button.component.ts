import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-join-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './join-button.component.html',
  styleUrls: ['./join-button.component.scss']
})
export class JoinButtonComponent {
  @Input() joined: boolean = false;
  @Input() disabled: boolean = false;
  @Output() join = new EventEmitter<void>();
}
