import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPendienteComponent } from './job-pendiente.component';

describe('JobPendienteComponent', () => {
  let component: JobPendienteComponent;
  let fixture: ComponentFixture<JobPendienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobPendienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPendienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
