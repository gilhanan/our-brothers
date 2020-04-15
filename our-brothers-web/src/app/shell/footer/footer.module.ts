import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer.component';

const api = [FooterComponent];

@NgModule({
  imports: [RouterModule],
  exports: api,
  declarations: [...api],
  providers: []
})
export class FooterModule {}
