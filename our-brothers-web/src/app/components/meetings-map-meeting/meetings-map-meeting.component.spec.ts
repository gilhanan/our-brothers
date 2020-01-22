import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingsMapMeetingComponent } from './meetings-map-meeting.component';

describe('MeetingsMapMeetingComponent', () => {
  let component: MeetingsMapMeetingComponent;
  let fixture: ComponentFixture<MeetingsMapMeetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingsMapMeetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingsMapMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
