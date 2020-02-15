import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationProgressBarComponent } from './registration-progress-bar.component';

describe('RegistrationProgressBarComponent', () => {
  let component: RegistrationProgressBarComponent;
  let fixture: ComponentFixture<RegistrationProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationProgressBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
