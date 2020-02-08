import { Component, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';

export interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {

  @Input() value: string | string[];
  @Input() options: SelectOption[];
  @Input() multi: boolean = false;
  @Input() placeholder: string;
  @Input() readonly: boolean = false;

  @Output() valueChange = new EventEmitter<string | string[]>();

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
      this.preview = true;
    }
  }

  preview: boolean = true;
  isOpen: boolean = false;

  constructor(private elementRef: ElementRef) { }

  renderValue() {
    if (!this.value) {
      return this.placeholder || '';
    }

    const values = typeof this.value === 'string' ? [this.value] : [...this.value];

    return values
      .map(value => {
        const valueOption = this.options.find((option) => option.value === value);
        return valueOption && valueOption.label || '';
      })
      .join(', ');
  }

  onSelectOption(value: string) {
    this.valueChange.emit(value);
    this.isOpen = false;
  }
}
