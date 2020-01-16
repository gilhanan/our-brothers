import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingsMapComponent } from './meetings-map.component';

describe('MeetingsMapComponent', () => {
  let component: MeetingsMapComponent;
  let fixture: ComponentFixture<MeetingsMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingsMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
