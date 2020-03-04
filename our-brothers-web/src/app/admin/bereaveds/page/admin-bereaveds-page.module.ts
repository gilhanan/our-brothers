import { NgModule } from '@angular/core';
import { AdminBereavedsModule } from '../admin-bereaveds.module';
import { AdminBereavedsPageComponent } from './admin-bereaveds-page.component';
import { FreeTextFilterModule } from '../../../shared/components/free-text-filter/free-text-filter.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: 'bereaveds',
    component: AdminBereavedsPageComponent
  }
];

@NgModule({
  declarations: [AdminBereavedsPageComponent],
  imports: [AdminBereavedsModule, FreeTextFilterModule, CommonModule, RouterModule.forChild(routes)]
})
export class AdminBereavedsPageModule {}
