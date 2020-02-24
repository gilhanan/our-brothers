import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostMeetingInfoComponent } from './host-meeting-info.component';

describe('HostMeetingInfoComponent', () => {
  let component: HostMeetingInfoComponent;
  let fixture: ComponentFixture<HostMeetingInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostMeetingInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostMeetingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
