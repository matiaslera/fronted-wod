import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupPresupuestoComponent } from './popup-presupuesto.component';

describe('PopupPresupuestoComponent', () => {
  let component: PopupPresupuestoComponent;
  let fixture: ComponentFixture<PopupPresupuestoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupPresupuestoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupPresupuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
