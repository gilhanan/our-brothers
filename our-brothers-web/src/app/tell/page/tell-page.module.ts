import { NgModule } from '@angular/core';
import { TellPageComponent } from './tell-page.component';
import { RouterModule } from '@angular/router';
import { RegistrationProgressBarModule } from '../../shared/components/registration-progress-bar/registration-progress-bar.module';
import { MeetingsComponentsModule } from '../../shared/components/meetings/meetings-components.module';
import { TellModule } from '../tell.module';
import { CommonModule } from '@angular/common';

const routes = [
  {
    path: '',
    component: TellPageComponent
  }
];

@NgModule({
  imports: [
    TellModule,
    RouterModule.forChild(routes),
    RegistrationProgressBarModule,
    MeetingsComponentsModule,
    CommonModule
  ],
  declarations: [TellPageComponent]
})
export class TellPageModule {}
