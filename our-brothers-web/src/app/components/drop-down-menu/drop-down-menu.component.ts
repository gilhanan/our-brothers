import { Component, OnInit, Input, TemplateRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-drop-down-menu',
  templateUrl: './drop-down-menu.component.html',
  styleUrls: ['./drop-down-menu.component.scss']
})
export class DropDownMenuComponent implements OnInit {
  @Input() menuContent: TemplateRef<any>;
  @Input() menuAnchor: TemplateRef<any>;
  @Input() disabled: boolean = false;
  @Output() click = new EventEmitter<any>();

  constructor() { }

  ngOnInit() { }
}
