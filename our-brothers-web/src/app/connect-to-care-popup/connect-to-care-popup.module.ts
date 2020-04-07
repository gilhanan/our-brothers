import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectToCarePopupComponent } from './connect-to-care-popup.component';

@NgModule({
  declarations: [ConnectToCarePopupComponent],
  exports: [ConnectToCarePopupComponent],
  imports: [CommonModule]
})
export class ConnectToCarePopupModule {}
