import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingsMapNavigatorComponent } from './meetings-map-navigator.component';

describe('MeetingsMapNavigatorComponent', () => {
  let component: MeetingsMapNavigatorComponent;
  let fixture: ComponentFixture<MeetingsMapNavigatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingsMapNavigatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingsMapNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
