import {NgModule} from "@angular/core";
import {FlipCardComponent} from "./flip-card.component";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [FlipCardComponent],
  exports: [FlipCardComponent],
  imports: [
    CommonModule
  ]
})
export class FilpCardModule {}
