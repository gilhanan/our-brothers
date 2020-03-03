import {NgModule} from "@angular/core";
import {ContactFormComponent} from "./contact-form.component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [ContactFormComponent],
  exports: [ContactFormComponent],
  imports: [
    ReactiveFormsModule
  ]
})
export class ContactFormModule {}
