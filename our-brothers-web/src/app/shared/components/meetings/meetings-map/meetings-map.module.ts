import {NgModule} from "@angular/core";
import {MeetingsMapComponent} from "./meetings-map.component";
import {MeetingsMapNavigatorComponent} from "./meetings-map-navigator/meetings-map-navigator.component";
import {MeetingsMapMeetingComponent} from "./meetings-map-meeting/meetings-map-meeting.component";
import {MeetingsMapLegendComponent} from "./meetings-map-legend/meetings-map-legend.component";
import {MeetingsMapGuideComponent} from "./meetings-map-guide/meetings-map-guide.component";
import {CommonModule} from "@angular/common";
import {AgmCoreModule} from "@agm/core";
import {AgmJsMarkerClustererModule} from "@agm/js-marker-clusterer";
import {JoinButtonModule} from "../../join-button/join-button.module";
import {RouterModule} from "@angular/router";

const api = [MeetingsMapComponent, MeetingsMapNavigatorComponent, MeetingsMapMeetingComponent, MeetingsMapLegendComponent, MeetingsMapGuideComponent];

@NgModule({
  declarations: api,
  exports: api,
  imports: [
    CommonModule,
    AgmCoreModule,
    AgmJsMarkerClustererModule,
    JoinButtonModule,
    RouterModule
  ]
})
export class MeetingsMapModule {}
