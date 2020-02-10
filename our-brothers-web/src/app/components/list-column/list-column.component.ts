import { Component, Input, Output, EventEmitter, HostListener, HostBinding, OnChanges, SimpleChanges, AfterContentInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-list-column',
  templateUrl: './list-column.component.html',
  styleUrls: ['./list-column.component.scss']
})
export class ListColumnComponent implements OnChanges, AfterViewInit {
  @Input() field: string;
  @Output() sort = new EventEmitter<void>();

  @HostListener('click', ['$event.target']) onClick() {
    if (!!this.field) {
      this.sort.emit();
    }
  }

  @HostBinding('class.empty') emptyClass: boolean = true;
  @HostBinding('class.sortable') sortableClass: boolean = !!this.field;

  @ViewChild('title', { static: false }) title: ElementRef<HTMLElement>;

  sorted: '' | 'asc' | 'desc' = '';

  ngOnChanges(changes: SimpleChanges): void {
    this.sortableClass = !!this.field;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.emptyClass = !this.title.nativeElement.innerHTML;
    });
  }
}
