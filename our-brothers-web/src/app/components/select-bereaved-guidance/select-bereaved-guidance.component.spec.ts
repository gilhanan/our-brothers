import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBereavedGuidanceComponent } from './select-bereaved-guidance.component';

describe('SelectBereavedGuidanceComponent', () => {
  let component: SelectBereavedGuidanceComponent;
  let fixture: ComponentFixture<SelectBereavedGuidanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectBereavedGuidanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectBereavedGuidanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
