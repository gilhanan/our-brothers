import { NgModule } from '@angular/core';
import { AdminUsersModule } from '../admin-users.module';
import { AdminUsersPageComponent } from './admin-users-page.component';
import { FreeTextFilterModule } from '../../../shared/components/free-text-filter/free-text-filter.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '',
    component: AdminUsersPageComponent
  }
];

@NgModule({
  declarations: [AdminUsersPageComponent],
  imports: [AdminUsersModule, FreeTextFilterModule, CommonModule, RouterModule.forChild(routes)]
})
export class AdminUsersPageModule {}
