import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-host-input-text',
  templateUrl: './host-input-text.component.html',
  styleUrls: ['./host-input-text.component.scss']
})
export class HostInputTextComponent implements OnInit {
  @Input() iconUrl: string;
  @Input() label: string;
  @Input() controlName: string;
  @Input() formGroup: FormGroup;
  @Input() inputType = 'text';
  @Input() textarea = false;

  @ViewChild('input', { read: ElementRef, static: false }) inputElm: ElementRef;

  constructor() {}

  ngOnInit() {}

  get control() {
    return this.formGroup.get(this.controlName);
  }

  focusInput() {
    this.inputElm.nativeElement.focus();
  }
}
