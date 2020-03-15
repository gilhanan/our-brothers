import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'app-editable-text',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './editable-text.component.html',
  styleUrls: ['./editable-text.component.scss']
})
export class EditableTextComponent {
  _value: string;
  @Input()
  set value(value: string) {
    this._value = value;
    this.newValue = this.value;
  }

  get value(): string {
    return this._value;
  }

  @Input() type: 'text' | 'textarea' | 'date' | 'cities';

  @Output() valueChange = new EventEmitter<any>();

  editable = false;

  newValue: string;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.elementRef.nativeElement.contains(event.target)) {
      this.editable = true;
    } else {
      if (this.editable) {
        this.editable = false;
        if (!this.newValue) {
          this.valueChange.emit(null);
        } else {
          this.valueChange.emit(this.type === 'date' ? Date.parse(this.newValue) : this.newValue);
        }
      }
    }
  }

  constructor(private elementRef: ElementRef) {}
}
