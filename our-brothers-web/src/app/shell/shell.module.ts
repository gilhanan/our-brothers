import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DropDownMenuModule } from '../shared/components/drop-down-menu/drop-down-menu.module';

const api = [HeaderComponent, FooterComponent];

@NgModule({
  declarations: api,
  exports: api,
  imports: [CommonModule, RouterModule, DropDownMenuModule]
})
export class ShellModule {}
