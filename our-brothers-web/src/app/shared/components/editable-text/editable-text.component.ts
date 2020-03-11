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
}

@Component({
  selector: 'app-editable-text',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './editable-text.component.html',
  styleUrls: ['./editable-text.component.scss']
})
export class EditableTextComponent implements OnInit {
  @Input() value: string;
  @Input() multilines: boolean = false;

  @Output() valueChange = new EventEmitter<string>();

  editable = false;

  newValue: string;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.elementRef.nativeElement.contains(event.target)) {
      this.editable = true;
    } else {
      this.editable = false;
      if (this.value !== this.newValue) {
        this.valueChange.emit(this.newValue);
      }
    }
  }

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.newValue = this.value;
  }
}
