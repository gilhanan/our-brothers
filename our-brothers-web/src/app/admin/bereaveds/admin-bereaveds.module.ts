import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SelectModule } from '../../shared/components/select/select.module';
import { BereavedsListComponent } from './bereaveds-list/bereaveds-list.component';
import { BereavedsListRowComponent } from './bereaveds-list-row/bereaveds-list-row.component';
import { SelectBereavedGuidanceComponent } from './select-bereaved-guidance/select-bereaved-guidance.component';
import { SelectBereavedStatusComponent } from './select-bereaved-status/select-bereaved-status.component';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { ListModule } from '../../shared/components/list/list.module';
import { ModalSelectMeetingComponent } from './modal-select-meeting/modal-select-meeting.component';
import { FreeTextFilterModule } from '../../shared/components/free-text-filter/free-text-filter.module';
import { MeetingsListModule } from '../../shared/components/meetings/meetings-list/meetings-list.module';
import { JoinButtonModule } from '../../shared/components/join-button/join-button.module';
import { MeetingJoinButtonModule } from '../../shared/components/meeting-join-button/meeting-join-button.module';
import { RemoveButtonModule } from 'src/app/shared/components/remove-button/remove-button.module';
import { SortBereavedsPipe } from './sort-bereaveds/sort-bereaveds.pipe';
import { EditableTextModule } from 'src/app/shared/components/editable-text/editable-text.module';

const api = [
  SelectBereavedStatusComponent,
  SelectBereavedGuidanceComponent,
  BereavedsListRowComponent,
  BereavedsListComponent,
  ModalSelectMeetingComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SelectModule,
    PipesModule,
    ListModule,
    FreeTextFilterModule,
    EditableTextModule,
    MeetingsListModule,
    JoinButtonModule,
    MeetingJoinButtonModule,
    RemoveButtonModule
  ],
  declarations: [api, SortBereavedsPipe],
  exports: api
})
export class AdminBereavedsModule {}
