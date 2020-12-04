import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnPayComponent } from './turn-pay.component';

describe('TurnPayComponent', () => {
  let component: TurnPayComponent;
  let fixture: ComponentFixture<TurnPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
