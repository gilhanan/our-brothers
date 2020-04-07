import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-connect-to-care-popup',
  templateUrl: './connect-to-care-popup.component.html',
  styleUrls: ['./connect-to-care-popup.component.scss']
})
export class ConnectToCarePopupComponent {
  @Output() close = new EventEmitter<void>();
}
