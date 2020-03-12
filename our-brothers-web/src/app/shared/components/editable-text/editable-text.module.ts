import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlacesSelectModule } from '../places-select/places-select.module';
import { EditableTextComponent } from './editable-text.component';

@NgModule({
  declarations: [EditableTextComponent],
  imports: [CommonModule, PlacesSelectModule],
  exports: [EditableTextComponent]
})
export class EditableTextModule {}
