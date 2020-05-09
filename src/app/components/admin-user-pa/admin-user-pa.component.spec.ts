import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserPaComponent } from './admin-user-pa.component';

describe('AdminUserPaComponent', () => {
  let component: AdminUserPaComponent;
  let fixture: ComponentFixture<AdminUserPaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserPaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserPaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
