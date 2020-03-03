import {NgModule} from "@angular/core";
import {PhonePipe} from "./phone.pipe";
import {SeniorityPipe} from "./seniority.pipe";

const pipes = [PhonePipe, SeniorityPipe];

@NgModule({
  declarations: pipes,
  exports: pipes
})
export class PipesModule {}
