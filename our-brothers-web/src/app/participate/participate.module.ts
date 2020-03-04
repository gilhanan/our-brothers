import { NgModule } from '@angular/core';
import { ParticipateIntroComponent } from './participate-intro/participate-intro.component';

const api = [ParticipateIntroComponent];

@NgModule({
  declarations: api,
  exports: api
})
export class ParticipateModule {}
