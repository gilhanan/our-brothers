import { NgModule } from '@angular/core';
import { PhonePipe } from './phone.pipe';
import { SeniorityPipe } from './seniority.pipe';
import { SafePipe } from './safe.pipe';

const pipes = [PhonePipe, SeniorityPipe, SafePipe];

@NgModule({
  declarations: pipes,
  exports: pipes
})
export class PipesModule {}
