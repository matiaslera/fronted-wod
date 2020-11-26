import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnDatosComponent } from './turn-datos.component';

describe('TurnDatosComponent', () => {
  let component: TurnDatosComponent;
  let fixture: ComponentFixture<TurnDatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnDatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
