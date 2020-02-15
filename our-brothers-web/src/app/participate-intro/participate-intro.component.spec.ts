import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipateIntroComponent } from './participate-intro.component';

describe('ParticipateIntroComponent', () => {
  let component: ParticipateIntroComponent;
  let fixture: ComponentFixture<ParticipateIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipateIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipateIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
