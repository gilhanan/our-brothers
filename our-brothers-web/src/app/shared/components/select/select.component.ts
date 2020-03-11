import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';

export interface SelectOption {
  value: string;
  label: string;
  details?: string;
}

type OptionsMap = { [value: string]: SelectOption };

type SelectedMap = { [value: string]: boolean };

@Component({
  selector: 'app-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  values: string[];

  @Input()
  set value(value: string | string[]) {
    if (Array.isArray(value)) {
      this.values = value;
    } else {
      this.values = value ? [value] : [];
    }

    this.selectedMap = this.values.reduce(
      (acc, curr) => ({
        ...acc,
        [curr]: true
      }),
      {} as SelectedMap
    );
  }

  _options: SelectOption[];

  @Input()
  set options(options: SelectOption[]) {
    this._options = options;

    this.optionsMap = this.options.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.value]: curr
      }),
      {} as OptionsMap
    );
  }

  get options() {
    return this._options;
  }

  @Input() placeholder: string = 'לא נבחר';
  @Input() multiple: boolean = false;
  @Input() readonly: boolean = false;

  @Output() valueChange = new EventEmitter<string | string[]>();

  optionsMap: OptionsMap;
  selectedMap: SelectedMap;
  dirty: boolean = false;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      if (this.multiple && this.open && this.dirty) {
        this.valueChange.emit(this.values);
      }

      this.open = false;
      this.editable = false;
    }
  }

  editable: boolean = false;
  open: boolean = false;

  constructor(private elementRef: ElementRef) {}

  onSelectOption(value: string) {
    if (!this.multiple) {
      this.valueChange.emit(value);
      this.open = false;
    } else {
      this.dirty = true;

      if (this.selectedMap[value]) {
        this.value = this.values.filter(v => v !== value);
      } else {
        this.value = [...this.values, value];
      }
    }
  }
}
