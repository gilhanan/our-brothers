import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBereavedStatusComponent } from './select-bereaved-status.component';

describe('SelectBereavedStatusComponent', () => {
  let component: SelectBereavedStatusComponent;
  let fixture: ComponentFixture<SelectBereavedStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectBereavedStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectBereavedStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
