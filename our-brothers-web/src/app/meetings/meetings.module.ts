import {NgModule} from "@angular/core";
import {HostMeetingInputTextComponent} from "./host-meeting-input-text/host-meeting-input-text.component";
import {MeetingParticipatesListComponent} from "./meeting-participates-list/meeting-participates-list.component";
import {PipesModule} from "../shared/pipes/pipes.module";
import {CommonModule} from "@angular/common";

const api = [HostMeetingInputTextComponent, MeetingParticipatesListComponent];

@NgModule({
  declarations: api,
  imports: [
    PipesModule,
    CommonModule
  ],
  exports: api
})
export class MeetingsModule {}
