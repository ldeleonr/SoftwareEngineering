import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPuntosAtencionComponent } from './admin-puntos-atencion.component';

describe('AdminPuntosAtencionComponent', () => {
  let component: AdminPuntosAtencionComponent;
  let fixture: ComponentFixture<AdminPuntosAtencionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPuntosAtencionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPuntosAtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
