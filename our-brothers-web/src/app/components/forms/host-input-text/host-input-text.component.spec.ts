import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostInputTextComponent } from './host-input-text.component';

describe('HostInputTextComponent', () => {
  let component: HostInputTextComponent;
  let fixture: ComponentFixture<HostInputTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostInputTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostInputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
