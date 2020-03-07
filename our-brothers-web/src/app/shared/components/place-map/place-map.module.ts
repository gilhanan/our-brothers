import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';

import { PlaceMapComponent } from './place-map.component';

@NgModule({
  declarations: [PlaceMapComponent],
  imports: [CommonModule, AgmCoreModule],
  exports: [PlaceMapComponent]
})
export class PlaceMapModule {}
