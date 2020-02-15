import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlainFormComponent } from './slain-form.component';

describe('SlainFormComponent', () => {
  let component: SlainFormComponent;
  let fixture: ComponentFixture<SlainFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlainFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlainFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
