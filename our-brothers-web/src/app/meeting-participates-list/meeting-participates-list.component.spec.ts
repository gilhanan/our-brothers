import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingParticipatesListComponent } from './meeting-participates-list.component';

describe('MeetingParticipatesListComponent', () => {
  let component: MeetingParticipatesListComponent;
  let fixture: ComponentFixture<MeetingParticipatesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingParticipatesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingParticipatesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
