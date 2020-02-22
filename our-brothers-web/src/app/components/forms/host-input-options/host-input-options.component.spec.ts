import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostInputOptionsComponent } from './host-input-options.component';

describe('HostInputOptionsComponent', () => {
  let component: HostInputOptionsComponent;
  let fixture: ComponentFixture<HostInputOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostInputOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostInputOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
