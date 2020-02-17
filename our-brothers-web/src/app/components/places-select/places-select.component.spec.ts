import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesSelectComponent } from './places-select.component';

describe('PlacesSelectComponent', () => {
  let component: PlacesSelectComponent;
  let fixture: ComponentFixture<PlacesSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacesSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacesSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
