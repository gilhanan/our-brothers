import { NgModule } from '@angular/core';
import { JoinButtonComponent } from './join-button.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [JoinButtonComponent],
  exports: [JoinButtonComponent],
  imports: [CommonModule]
})
export class JoinButtonModule {}
