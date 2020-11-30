import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnMainComponent } from './turn-main.component';

describe('TurnMainComponent', () => {
  let component: TurnMainComponent;
  let fixture: ComponentFixture<TurnMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
