import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnPopupComponent } from './turn-popup.component';

describe('TurnPopupComponent', () => {
  let component: TurnPopupComponent;
  let fixture: ComponentFixture<TurnPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
