import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobFinalizadoComponent } from './job-finalizado.component';

describe('JobFinalizadoComponent', () => {
  let component: JobFinalizadoComponent;
  let fixture: ComponentFixture<JobFinalizadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobFinalizadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobFinalizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
