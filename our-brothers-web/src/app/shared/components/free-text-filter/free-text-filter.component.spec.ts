import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeTextFilterComponent } from './free-text-filter.component';

describe('FreeTextFilterComponent', () => {
  let component: FreeTextFilterComponent;
  let fixture: ComponentFixture<FreeTextFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeTextFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeTextFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
