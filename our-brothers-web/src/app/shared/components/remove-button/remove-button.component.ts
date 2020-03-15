import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-remove-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './remove-button.component.html',
  styleUrls: ['./remove-button.component.scss']
})
export class RemoveButtonComponent {
  @Output() remove = new EventEmitter<void>();
}
