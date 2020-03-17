import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveUsersStatisticsComponent } from './active-users-statistics/active-users-statistics.component';
import { BereavedsStatisticsComponent } from './bereaveds-statistics/bereaveds-statistics.component';
import { MeetingsStatisticsComponent } from './meetings-statistics/meetings-statistics.component';
import { RegistrationsStatisticsComponent } from './registrations-statistics/registrations-statistics.component';

const api = [
  ActiveUsersStatisticsComponent,
  BereavedsStatisticsComponent,
  MeetingsStatisticsComponent,
  RegistrationsStatisticsComponent
];

@NgModule({
  imports: [CommonModule],
  declarations: [api],
  exports: api
})
export class AdminStatisticsModule {}
