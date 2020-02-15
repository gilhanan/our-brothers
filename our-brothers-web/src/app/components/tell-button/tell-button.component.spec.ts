import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TellButtonComponent } from './tell-button.component';

describe('TellButtonComponent', () => {
  let component: TellButtonComponent;
  let fixture: ComponentFixture<TellButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TellButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TellButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
