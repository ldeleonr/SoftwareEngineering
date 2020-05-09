import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposQuejasComponent } from './tipos-quejas.component';

describe('TiposQuejasComponent', () => {
  let component: TiposQuejasComponent;
  let fixture: ComponentFixture<TiposQuejasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiposQuejasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposQuejasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
