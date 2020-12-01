import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TunoListComponent } from './tuno-list.component';

describe('TunoListComponent', () => {
  let component: TunoListComponent;
  let fixture: ComponentFixture<TunoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TunoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TunoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
