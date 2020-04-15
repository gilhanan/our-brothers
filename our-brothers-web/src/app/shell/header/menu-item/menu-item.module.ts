import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MenuItemComponent } from './menu-item.component';

const api = [MenuItemComponent];

@NgModule({
  declarations: [...api],
  exports: api,
  imports: [CommonModule, RouterModule]
})
export class MenuItemModule {}
