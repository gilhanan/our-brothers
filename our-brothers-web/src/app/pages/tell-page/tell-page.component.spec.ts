import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TellPageComponent } from './tell-page.component';

describe('TellPageComponent', () => {
  let component: TellPageComponent;
  let fixture: ComponentFixture<TellPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TellPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TellPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
