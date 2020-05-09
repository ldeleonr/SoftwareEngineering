import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignQuejaMalServicioComponent } from './asign-queja-mal-servicio.component';

describe('AsignQuejaMalServicioComponent', () => {
  let component: AsignQuejaMalServicioComponent;
  let fixture: ComponentFixture<AsignQuejaMalServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignQuejaMalServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignQuejaMalServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
