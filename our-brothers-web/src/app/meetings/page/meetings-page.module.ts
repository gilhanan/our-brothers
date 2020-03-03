import {NgModule} from "@angular/core";
import {MeetingsPageComponent} from "./meetings-page.component";
import {ParticipationsButtonsModule} from "../../shared/components/participations-buttons/participations-buttons.module";
import {MeetingsComponentsModule} from "../../shared/components/meetings/meetings-components.module";
import {RouterModule} from "@angular/router";
import {MeetingDetailsPageComponent} from "../details-page/meeting-details-page.component";
import {CommonModule} from "@angular/common";
import {PipesModule} from "../../shared/pipes/pipes.module";
import {MeetingsModule} from "../meetings.module";

const routes = [      {
  path: '',
  component: MeetingsPageComponent,
},
  {
    path: ':memorialYear/:hostId/:meetingId',
    component: MeetingDetailsPageComponent,
  }];

@NgModule({
  imports: [MeetingsModule, ParticipationsButtonsModule, MeetingsComponentsModule, RouterModule.forChild(routes), CommonModule, PipesModule],
  declarations: [MeetingsPageComponent, MeetingDetailsPageComponent]
})
export class MeetingsPageModule {}
