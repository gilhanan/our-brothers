import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-host-input-text',
  templateUrl: './host-input-text.component.html',
  styleUrls: ['./host-input-text.component.scss']
})
export class HostInputTextComponent {
  @Input() iconUrl: string;
  @Input() label: string;
  @Input() controlName: string;
  @Input() formGroup: FormGroup;
  @Input() inputType = 'text';
  @Input() textarea = false;
  @Input() min: string;
  @Input() max: string;

  @ViewChild('input', { read: ElementRef }) inputElm: ElementRef;

  get control() {
    return this.formGroup.get(this.controlName);
  }

  focusInput() {
    this.inputElm.nativeElement.focus();
  }
}
