import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { MeetingsMapComponent } from './meetings-map.component';
import { MeetingsMapNavigatorComponent } from './meetings-map-navigator/meetings-map-navigator.component';
import { MeetingsMapMeetingComponent } from './meetings-map-meeting/meetings-map-meeting.component';
import { MeetingsMapLegendComponent } from './meetings-map-legend/meetings-map-legend.component';
import { MeetingsMapGuideComponent } from './meetings-map-guide/meetings-map-guide.component';
import { MeetingJoinButtonModule } from '../../meeting-join-button/meeting-join-button.module';

const api = [
  MeetingsMapComponent,
  MeetingsMapNavigatorComponent,
  MeetingsMapMeetingComponent,
  MeetingsMapLegendComponent,
  MeetingsMapGuideComponent
];

@NgModule({
  declarations: api,
  exports: api,
  imports: [CommonModule, AgmCoreModule, AgmJsMarkerClustererModule, MeetingJoinButtonModule, RouterModule]
})
export class MeetingsMapModule {}
