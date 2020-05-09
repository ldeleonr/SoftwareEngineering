import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoQuejaContribuyenteComponent } from './ingreso-queja-contribuyente.component';

describe('IngresoQuejaContribuyenteComponent', () => {
  let component: IngresoQuejaContribuyenteComponent;
  let fixture: ComponentFixture<IngresoQuejaContribuyenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresoQuejaContribuyenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoQuejaContribuyenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
