import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoConsultaContribuyenteComponent } from './auto-consulta-contribuyente.component';

describe('AutoConsultaContribuyenteComponent', () => {
  let component: AutoConsultaContribuyenteComponent;
  let fixture: ComponentFixture<AutoConsultaContribuyenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoConsultaContribuyenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoConsultaContribuyenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
