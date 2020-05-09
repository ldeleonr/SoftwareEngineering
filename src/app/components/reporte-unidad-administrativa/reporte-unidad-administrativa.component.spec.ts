import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteUnidadAdministrativaComponent } from './reporte-unidad-administrativa.component';

describe('ReporteUnidadAdministrativaComponent', () => {
  let component: ReporteUnidadAdministrativaComponent;
  let fixture: ComponentFixture<ReporteUnidadAdministrativaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteUnidadAdministrativaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteUnidadAdministrativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
