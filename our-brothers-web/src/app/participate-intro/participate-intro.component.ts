import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-participate-intro',
  templateUrl: './participate-intro.component.html',
  styleUrls: ['./participate-intro.component.scss']
})
export class ParticipateIntroComponent implements OnInit {

  @Output()
  public submit = new EventEmitter<void>()

  constructor() { }

  ngOnInit() {
  }

}
