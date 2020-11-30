import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnProximosComponent } from './turn-proximos.component';

describe('TurnProximosComponent', () => {
  let component: TurnProximosComponent;
  let fixture: ComponentFixture<TurnProximosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnProximosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnProximosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
