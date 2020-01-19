import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingsMapGuideComponent } from './meetings-map-guide.component';

describe('MeetingsMapGuideComponent', () => {
  let component: MeetingsMapGuideComponent;
  let fixture: ComponentFixture<MeetingsMapGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingsMapGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingsMapGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
