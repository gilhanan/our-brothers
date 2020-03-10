import { NgModule } from '@angular/core';
import { DonatePageComponent } from './donate-page.component';
import { RouterModule } from '@angular/router';
import { PaymentInfoFormComponent } from './payment-info-form/payment-info-form.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes = [
  {
    path: '',
    component: DonatePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), ReactiveFormsModule],
  declarations: [DonatePageComponent, PaymentInfoFormComponent]
})
export class DonatePageModule {}
