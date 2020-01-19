import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewToggleComponent } from './view-toggle.component';

describe('MapListToggleComponent', () => {
  let component: ViewToggleComponent;
  let fixture: ComponentFixture<ViewToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
