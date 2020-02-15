import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BereavedGuidanceFormComponent } from './bereaved-guidance-form.component';

describe('BereavedGuidanceFormComponent', () => {
  let component: BereavedGuidanceFormComponent;
  let fixture: ComponentFixture<BereavedGuidanceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BereavedGuidanceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BereavedGuidanceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
