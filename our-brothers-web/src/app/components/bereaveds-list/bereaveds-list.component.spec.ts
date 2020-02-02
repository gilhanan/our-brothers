import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BereavedsListComponent } from './bereaveds-list.component';

describe('BereavedsListComponent', () => {
  let component: BereavedsListComponent;
  let fixture: ComponentFixture<BereavedsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BereavedsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BereavedsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
