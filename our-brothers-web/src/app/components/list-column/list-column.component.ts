import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-list-column',
  templateUrl: './list-column.component.html',
  styleUrls: ['./list-column.component.scss']
})
export class ListColumnComponent {

  @Input() field: string;
  @Output() sort = new EventEmitter<void>();

  @HostListener('click', ['$event.target']) onClick() {
    this.sort.emit();
  }

  sorted: '' | 'asc' | 'desc' = '';
}
