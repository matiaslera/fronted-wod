import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TunoItemComponent } from './tuno-item.component';

describe('TunoItemComponent', () => {
  let component: TunoItemComponent;
  let fixture: ComponentFixture<TunoItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TunoItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TunoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
