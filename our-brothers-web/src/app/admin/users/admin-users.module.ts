import { NgModule } from '@angular/core';
import { SelectModule } from '../../shared/components/select/select.module';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersListRowComponent } from './users-list-row/users-list-row.component';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { ListModule } from '../../shared/components/list/list.module';
import { FreeTextFilterModule } from '../../shared/components/free-text-filter/free-text-filter.module';
import { SortUsersPipe } from './sort-users/sort-users.pipe';

const api = [UsersListRowComponent, UsersListComponent];

@NgModule({
  imports: [SelectModule, CommonModule, PipesModule, ListModule, FreeTextFilterModule],
  declarations: [api, SortUsersPipe],
  exports: api
})
export class AdminUsersModule {}
