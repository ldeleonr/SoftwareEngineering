import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoPuntosAtencionComponent } from './seguimiento-puntos-atencion.component';

describe('SeguimientoPuntosAtencionComponent', () => {
  let component: SeguimientoPuntosAtencionComponent;
  let fixture: ComponentFixture<SeguimientoPuntosAtencionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeguimientoPuntosAtencionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguimientoPuntosAtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
