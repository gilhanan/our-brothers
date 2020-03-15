import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinButtonModule } from '../join-button/join-button.module';
import { MeetingJoinButtonComponent } from './meeting-join-button.component';

@NgModule({
  declarations: [MeetingJoinButtonComponent],
  exports: [MeetingJoinButtonComponent],
  imports: [CommonModule, JoinButtonModule]
})
export class MeetingJoinButtonModule {}
