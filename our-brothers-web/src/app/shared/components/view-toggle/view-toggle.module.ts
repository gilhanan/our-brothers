import {NgModule} from "@angular/core";
import {ViewToggleComponent} from "./view-toggle.component";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [ViewToggleComponent],
  exports: [ViewToggleComponent],
  imports: [
    CommonModule
  ]
})
export class ViewToggleModule {}
