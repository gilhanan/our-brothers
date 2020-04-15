import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MenuItemModule } from './menu-item';
import { HeaderComponent } from './header.component';

const api = [HeaderComponent];

@NgModule({
  imports: [CommonModule, RouterModule, MenuItemModule],
  exports: api,
  declarations: [...api],
  providers: []
})
export class HeaderModule {}
