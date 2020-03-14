import { NgModule } from '@angular/core';
import { MeetingsListComponent } from './meetings-list.component';
import { MeetingListRowComponent } from './meeting-list-row/meeting-list-row.component';
import { MeetingJoinButtonModule } from '../../meeting-join-button/meeting-join-button.module';
import { ListModule } from '../../list/list.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CheckboxModule } from '../../checkbox/checkbox.module';

const api = [MeetingsListComponent, MeetingListRowComponent];

@NgModule({
  imports: [MeetingJoinButtonModule, ListModule, ScrollingModule, CommonModule, RouterModule, CheckboxModule],
  declarations: api,
  exports: api
})
export class MeetingsListModule {}
