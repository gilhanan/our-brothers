import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBereavedsPageComponent } from './admin-bereaveds-page.component';

describe('AdminBereavedsPageComponent', () => {
  let component: AdminBereavedsPageComponent;
  let fixture: ComponentFixture<AdminBereavedsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBereavedsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBereavedsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
