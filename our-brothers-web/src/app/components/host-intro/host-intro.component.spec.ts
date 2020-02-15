import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostIntroComponent } from './host-intro.component';

describe('HostIntroComponent', () => {
  let component: HostIntroComponent;
  let fixture: ComponentFixture<HostIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
