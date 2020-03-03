import {NgModule} from "@angular/core";
import {ProfileFormComponent} from "./profile-form.component";
import {ReactiveFormsModule} from "@angular/forms";
import {CheckboxModule} from "../checkbox/checkbox.module";

@NgModule({
  declarations: [ProfileFormComponent],
  exports: [ProfileFormComponent],
  imports: [
    ReactiveFormsModule,
    CheckboxModule
  ]
})
export class ProfileFormModule {}
