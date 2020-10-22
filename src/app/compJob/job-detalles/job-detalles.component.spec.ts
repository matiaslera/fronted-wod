import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDetallesComponent } from './job-detalles.component';

describe('JobDetallesComponent', () => {
  let component: JobDetallesComponent;
  let fixture: ComponentFixture<JobDetallesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobDetallesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
