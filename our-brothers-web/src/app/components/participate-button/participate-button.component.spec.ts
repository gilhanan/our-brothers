import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipateButtonComponent } from './participate-button.component';

describe('ParticipateButtonComponent', () => {
  let component: ParticipateButtonComponent;
  let fixture: ComponentFixture<ParticipateButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipateButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
