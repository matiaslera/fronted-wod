import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFormasPagosComponent } from './profile-formas-pagos.component';

describe('ProfileFormasPagosComponent', () => {
  let component: ProfileFormasPagosComponent;
  let fixture: ComponentFixture<ProfileFormasPagosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileFormasPagosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileFormasPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
