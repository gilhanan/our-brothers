import {NgModule} from "@angular/core";
import {ParticipatePageComponent} from "./participate-page.component";
import {RouterModule} from "@angular/router";
import {MeetingsComponentsModule} from "../../shared/components/meetings/meetings-components.module";
import {ProfileFormModule} from "../../shared/components/profile-form/profile-form.module";
import {RegistrationProgressBarModule} from "../../shared/components/registration-progress-bar/registration-progress-bar.module";
import {CommonModule} from "@angular/common";
import {ParticipateModule} from "../participate.module";

const routes = [{
  path: '',
  component: ParticipatePageComponent
}];

@NgModule({
  imports: [ParticipateModule, RouterModule.forChild(routes), MeetingsComponentsModule, ProfileFormModule, RegistrationProgressBarModule, CommonModule],
  declarations: [ParticipatePageComponent]
})
export class ParticipatePageModule {}
