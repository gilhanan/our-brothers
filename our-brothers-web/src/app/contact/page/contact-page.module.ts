import { NgModule } from '@angular/core';
import { ContactPageComponent } from './contact-page.component';
import { RouterModule } from '@angular/router';
import { ContactFormModule } from '../../shared/components/contact-form/contact-form.module';

const routes = [
  {
    path: '',
    component: ContactPageComponent
  }
];

@NgModule({
  imports: [ContactFormModule, RouterModule.forChild(routes)],
  declarations: [ContactPageComponent]
})
export class ContactPageModule {}
