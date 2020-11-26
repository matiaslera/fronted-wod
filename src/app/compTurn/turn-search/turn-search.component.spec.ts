import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnSearchComponent } from './turn-search.component';

describe('TurnSearchComponent', () => {
  let component: TurnSearchComponent;
  let fixture: ComponentFixture<TurnSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
