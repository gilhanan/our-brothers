import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostMeetingInputTextComponent } from './host-meeting-input-text.component';

describe('HostMeetingInputTextComponent', () => {
  let component: HostMeetingInputTextComponent;
  let fixture: ComponentFixture<HostMeetingInputTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostMeetingInputTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostMeetingInputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
