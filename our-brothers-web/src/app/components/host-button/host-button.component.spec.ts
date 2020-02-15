import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostButtonComponent } from './host-button.component';

describe('HostButtonComponent', () => {
  let component: HostButtonComponent;
  let fixture: ComponentFixture<HostButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
