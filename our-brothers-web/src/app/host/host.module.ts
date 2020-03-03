import {NgModule} from "@angular/core";
import {HostIntroComponent} from "./host-intro/host-intro.component";
import {HostFormComponent} from "./host-form/host-form.component";
import {ReactiveFormsModule} from "@angular/forms";
import {HostInputTextComponent} from "./host-input-text/host-input-text.component";
import {HostInputOptionsComponent} from "./host-input-options/host-input-options.component";
import {PlacesSelectModule} from "../shared/components/places-select/places-select.module";
import {PlaceMapModule} from "../shared/components/place-map/place-map.module";
import {CommonModule} from "@angular/common";

const api = [HostInputTextComponent, HostIntroComponent, HostFormComponent, HostInputOptionsComponent];

@NgModule({
  declarations: api,
  imports: [
    PlaceMapModule,
    PlacesSelectModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: api
})
export class HostModule {}
