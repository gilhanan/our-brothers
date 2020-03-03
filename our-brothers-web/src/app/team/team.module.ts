import {NgModule} from "@angular/core";
import {TeamCardComponent} from "./team-card/team-card.component";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [TeamCardComponent],
  exports: [TeamCardComponent],
  imports: [
    CommonModule
  ]
})
export class TeamModule {}
