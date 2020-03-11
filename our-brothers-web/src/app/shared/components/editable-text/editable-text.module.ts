import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditableTextComponent } from './editable-text.component';

@NgModule({
  declarations: [EditableTextComponent],
  imports: [CommonModule],
  exports: [EditableTextComponent]
})
export class EditableTextModule {}
