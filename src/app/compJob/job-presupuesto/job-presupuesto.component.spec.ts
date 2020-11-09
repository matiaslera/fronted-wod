import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPresupuestoComponent } from './job-presupuesto.component';

describe('JobPresupuestoComponent', () => {
  let component: JobPresupuestoComponent;
  let fixture: ComponentFixture<JobPresupuestoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobPresupuestoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPresupuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
