import {Component, Input, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-drop-down-menu',
  templateUrl: './drop-down-menu.component.html',
  styleUrls: ['./drop-down-menu.component.scss']
})
export class DropDownMenuComponent {
  @Input() menuContent: TemplateRef<any>;
  @Input() menuAnchor: TemplateRef<any>;
  @Input() disabled: boolean = false;
}
