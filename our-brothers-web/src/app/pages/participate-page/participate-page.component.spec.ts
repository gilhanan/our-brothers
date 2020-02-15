import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipatePageComponent } from './participate-page.component';

describe('ParticipatePageComponent', () => {
  let component: ParticipatePageComponent;
  let fixture: ComponentFixture<ParticipatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
