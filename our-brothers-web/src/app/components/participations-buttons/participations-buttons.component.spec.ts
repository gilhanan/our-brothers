import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipationsButtonsComponent } from './participations-buttons.component';

describe('ParticipationsButtonsComponent', () => {
  let component: ParticipationsButtonsComponent;
  let fixture: ComponentFixture<ParticipationsButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipationsButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipationsButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
