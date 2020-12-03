import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnPagoComponent } from './turn-pago.component';

describe('TurnPagoComponent', () => {
  let component: TurnPagoComponent;
  let fixture: ComponentFixture<TurnPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
