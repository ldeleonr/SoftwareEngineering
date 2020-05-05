import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoQuejaUsuarioComponent } from './ingreso-queja-usuario.component';

describe('IngresoQuejaUsuarioComponent', () => {
  let component: IngresoQuejaUsuarioComponent;
  let fixture: ComponentFixture<IngresoQuejaUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresoQuejaUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoQuejaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
