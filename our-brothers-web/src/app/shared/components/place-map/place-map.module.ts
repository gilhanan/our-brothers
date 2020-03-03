import {NgModule} from "@angular/core";
import {PlaceMapComponent} from "./place-map.component";
import {AgmCoreModule} from "@agm/core";

@NgModule({
  declarations: [PlaceMapComponent],
  imports: [
    AgmCoreModule
  ],
  exports: [PlaceMapComponent]
})
export class PlaceMapModule {}
