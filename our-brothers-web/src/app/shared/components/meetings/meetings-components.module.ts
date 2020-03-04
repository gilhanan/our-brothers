import { NgModule } from '@angular/core';
import { MeetingsListModule } from './meetings-list/meetings-list.module';
import { MeetingsComponent } from './meetings.component';
import { CommonModule } from '@angular/common';
import { MeetingsMapModule } from './meetings-map/meetings-map.module';
import { MeetingsFiltersModule } from './meetings-filters/meetings-filters.module';

@NgModule({
  imports: [MeetingsListModule, MeetingsMapModule, MeetingsFiltersModule, CommonModule],
  declarations: [MeetingsComponent],
  exports: [MeetingsComponent]
})
export class MeetingsComponentsModule {}
