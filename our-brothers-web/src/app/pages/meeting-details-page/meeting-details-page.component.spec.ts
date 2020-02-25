import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingDetailsPageComponent } from './meeting-details-page.component';

describe('MeetingDetailsPageComponent', () => {
  let component: MeetingDetailsPageComponent;
  let fixture: ComponentFixture<MeetingDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
