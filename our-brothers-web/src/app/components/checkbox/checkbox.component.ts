import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  @Input() label = '';
  @Input() checked = false;
  @Output() checkedChanged = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {}

  checkboxClicked() {
    this.checkedChanged.emit(!this.checked);
  }

  checkboxKeyup(e: KeyboardEvent) {
    // For space or enter keys
    if (e.code === 'Space' || e.code === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      this.checkboxClicked();
    }
  }
}
