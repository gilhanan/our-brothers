import { NgModule } from '@angular/core';
import { PaypalButtonComponent } from './paypal-button/paypal-button.component';

const api = [PaypalButtonComponent];

@NgModule({
  declarations: api,
  exports: api
})
export class DonateModule {}
