import { NgModule } from '@angular/core';
import { SlainFormComponent } from './slain-form/slain-form.component';
import { BereavedProfileFormComponent } from './bereaved-profile-form/bereaved-profile-form.component';
import { BereavedGuidanceFormComponent } from './bereaved-guidance-form/bereaved-guidance-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PlacesSelectModule } from '../shared/components/places-select/places-select.module';
import { CheckboxModule } from '../shared/components/checkbox/checkbox.module';
import { CommonModule } from '@angular/common';
import { BereavedIntroComponent } from './bereaved-intro/bereaved-intro.component';

const api = [SlainFormComponent, BereavedProfileFormComponent, BereavedGuidanceFormComponent, BereavedIntroComponent];

@NgModule({
  declarations: api,
  imports: [ReactiveFormsModule, PlacesSelectModule, CheckboxModule, CommonModule],
  exports: api
})
export class TellModule {}
