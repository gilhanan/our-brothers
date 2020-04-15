import { NgModule } from '@angular/core';

import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';

@NgModule({
  exports: [HeaderModule, FooterModule]
})
export class ShellModule {}
