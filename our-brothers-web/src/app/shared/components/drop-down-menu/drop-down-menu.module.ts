import {NgModule} from "@angular/core";
import {DropDownMenuComponent} from "./drop-down-menu.component";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [DropDownMenuComponent],
  exports: [DropDownMenuComponent],
  imports: [
    CommonModule
  ]
})
export class DropDownMenuModule {}
