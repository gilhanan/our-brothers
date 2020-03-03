import {NgModule} from "@angular/core";
import {SelectComponent} from "./select.component";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [SelectComponent],
  imports: [
    CommonModule
  ],
  exports: [SelectComponent]
})
export class SelectModule {}
