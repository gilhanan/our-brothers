import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BereavedsListRowComponent } from './bereaveds-list-row.component';

describe('BereavedsListRowComponent', () => {
  let component: BereavedsListRowComponent;
  let fixture: ComponentFixture<BereavedsListRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BereavedsListRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BereavedsListRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
