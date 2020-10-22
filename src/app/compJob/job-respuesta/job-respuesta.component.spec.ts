import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobRespuestaComponent } from './job-respuesta.component';

describe('JobRespuestaComponent', () => {
  let component: JobRespuestaComponent;
  let fixture: ComponentFixture<JobRespuestaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobRespuestaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobRespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
