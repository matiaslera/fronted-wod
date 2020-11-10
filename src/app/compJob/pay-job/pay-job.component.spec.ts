import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayJobComponent } from './pay-job.component';

describe('PayJobComponent', () => {
  let component: PayJobComponent;
  let fixture: ComponentFixture<PayJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
