import { NgModule } from '@angular/core';
import { DonatePageComponent } from './donate-page.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const routes = [
  {
    path: '',
    component: DonatePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), ReactiveFormsModule, CommonModule],
  declarations: [DonatePageComponent]
})
export class DonatePageModule {}
