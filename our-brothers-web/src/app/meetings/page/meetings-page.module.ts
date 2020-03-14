import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MeetingsPageComponent } from './meetings-page.component';
import { ParticipationsButtonsModule } from '../../shared/components/participations-buttons/participations-buttons.module';
import { MeetingsComponentsModule } from '../../shared/components/meetings/meetings-components.module';
import { MeetingDetailsPageComponent } from '../details-page/meeting-details-page.component';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { MeetingsModule } from '../meetings.module';
import { RemoveButtonModule } from '../../shared/components/remove-button/remove-button.module';
import { MeetingJoinButtonModule } from '../../shared/components/meeting-join-button/meeting-join-button.module';

const routes = [
  {
    path: '',
    component: MeetingsPageComponent
  },
  {
    path: ':memorialYear/:hostId/:meetingId',
    component: MeetingDetailsPageComponent
  }
];

@NgModule({
  imports: [
    MeetingsModule,
    ParticipationsButtonsModule,
    MeetingsComponentsModule,
    RemoveButtonModule,
    MeetingJoinButtonModule,
    RouterModule.forChild(routes),
    CommonModule,
    PipesModule
  ],
  declarations: [MeetingsPageComponent, MeetingDetailsPageComponent]
})
export class MeetingsPageModule {}
