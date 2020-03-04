import { NgModule } from '@angular/core';
import { RegistrationProgressBarComponent } from './registration-progress-bar.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [RegistrationProgressBarComponent],
  exports: [RegistrationProgressBarComponent],
  imports: [CommonModule]
})
export class RegistrationProgressBarModule {}
