import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BereavedProfileFormComponent } from './bereaved-profile-form.component';

describe('BereavedProfileFormComponent', () => {
  let component: BereavedProfileFormComponent;
  let fixture: ComponentFixture<BereavedProfileFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BereavedProfileFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BereavedProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
