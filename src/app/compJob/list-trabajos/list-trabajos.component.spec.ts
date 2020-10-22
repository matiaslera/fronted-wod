import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTrabajosComponent } from './list-trabajos.component';

describe('ListTrabajosComponent', () => {
  let component: ListTrabajosComponent;
  let fixture: ComponentFixture<ListTrabajosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTrabajosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTrabajosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
