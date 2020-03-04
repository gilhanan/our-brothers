import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderTogglerComponent } from './header-toggler.component';

describe('HeaderTogglerComponent', () => {
  let component: HeaderTogglerComponent;
  let fixture: ComponentFixture<HeaderTogglerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderTogglerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderTogglerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
