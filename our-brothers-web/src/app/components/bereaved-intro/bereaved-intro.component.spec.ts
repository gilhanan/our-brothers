import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BereavedIntroComponent } from './bereaved-intro.component';

describe('BereavedIntroComponent', () => {
  let component: BereavedIntroComponent;
  let fixture: ComponentFixture<BereavedIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BereavedIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BereavedIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
