import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminStatisticsModule } from '../admin-statistics.module';
import { AdminStatisticsPageComponent } from './admin-statistics-page.component';
import { CommonModule } from '@angular/common';

const routes = [
  {
    path: '',
    component: AdminStatisticsPageComponent
  }
];

@NgModule({
  declarations: [AdminStatisticsPageComponent],
  imports: [CommonModule, AdminStatisticsModule, RouterModule.forChild(routes)]
})
export class AdminStatisticsPageModule {}
