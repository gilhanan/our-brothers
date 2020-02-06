import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSelectMeetingComponent } from './modal-select-meeting.component';

describe('ModalSelectMeetingComponent', () => {
  let component: ModalSelectMeetingComponent;
  let fixture: ComponentFixture<ModalSelectMeetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSelectMeetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSelectMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
