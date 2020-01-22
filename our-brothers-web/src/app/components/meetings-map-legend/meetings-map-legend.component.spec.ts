import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingsMapLegendComponent } from './meetings-map-legend.component';

describe('MeetingsMapLegendComponent', () => {
  let component: MeetingsMapLegendComponent;
  let fixture: ComponentFixture<MeetingsMapLegendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingsMapLegendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingsMapLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
