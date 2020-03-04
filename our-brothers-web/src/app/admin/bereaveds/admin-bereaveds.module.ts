import { NgModule } from '@angular/core';
import { SelectModule } from '../../shared/components/select/select.module';
import { BereavedsListComponent } from './bereaveds-list/bereaveds-list.component';
import { BereavedsListRowComponent } from './bereaveds-list-row/bereaveds-list-row.component';
import { SelectBereavedGuidanceComponent } from './select-bereaved-guidance/select-bereaved-guidance.component';
import { SelectBereavedStatusComponent } from './select-bereaved-status/select-bereaved-status.component';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { ListModule } from '../../shared/components/list/list.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ModalSelectMeetingComponent } from './modal-select-meeting/modal-select-meeting.component';
import { FreeTextFilterModule } from '../../shared/components/free-text-filter/free-text-filter.module';
import { MeetingsListModule } from '../../shared/components/meetings/meetings-list/meetings-list.module';
import { JoinButtonModule } from '../../shared/components/join-button/join-button.module';
import { SortBereavedsPipe } from './sort-bereaveds/sort-bereaveds.pipe';

const api = [
  SelectBereavedStatusComponent,
  SelectBereavedGuidanceComponent,
  BereavedsListRowComponent,
  BereavedsListComponent,
  ModalSelectMeetingComponent
];

@NgModule({
  imports: [
    SelectModule,
    CommonModule,
    PipesModule,
    ListModule,
    ScrollingModule,
    FreeTextFilterModule,
    MeetingsListModule,
    JoinButtonModule
  ],
  declarations: [api, SortBereavedsPipe],
  exports: api
})
export class AdminBereavedsModule {}
