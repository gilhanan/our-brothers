import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-host-intro',
  templateUrl: './host-intro.component.html',
  styleUrls: ['./host-intro.component.scss']
})
export class HostIntroComponent implements OnInit {
  @Output() public nextStep = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}
}
