import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingListRowComponent } from './meeting-list-row.component';

describe('MeetingListRowComponent', () => {
  let component: MeetingListRowComponent;
  let fixture: ComponentFixture<MeetingListRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingListRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingListRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
