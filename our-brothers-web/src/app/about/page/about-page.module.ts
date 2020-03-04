import { NgModule } from '@angular/core';
import { AboutPageComponent } from './about-page.component';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '',
    component: AboutPageComponent
  }
];

@NgModule({
  declarations: [AboutPageComponent],
  imports: [RouterModule.forChild(routes)]
})
export class AboutPageModule {}
