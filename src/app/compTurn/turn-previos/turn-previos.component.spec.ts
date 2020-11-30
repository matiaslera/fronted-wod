import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnPreviosComponent } from './turn-previos.component';

describe('TurnPreviosComponent', () => {
  let component: TurnPreviosComponent;
  let fixture: ComponentFixture<TurnPreviosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnPreviosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnPreviosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
