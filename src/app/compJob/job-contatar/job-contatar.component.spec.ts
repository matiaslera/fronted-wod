import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobContatarComponent } from './job-contatar.component';

describe('JobContatarComponent', () => {
  let component: JobContatarComponent;
  let fixture: ComponentFixture<JobContatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobContatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobContatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
