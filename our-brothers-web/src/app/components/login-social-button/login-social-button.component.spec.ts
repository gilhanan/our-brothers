import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSocialButtonComponent } from './login-social-button.component';

describe('LoginSocialButtonComponent', () => {
  let component: LoginSocialButtonComponent;
  let fixture: ComponentFixture<LoginSocialButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginSocialButtonComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSocialButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
