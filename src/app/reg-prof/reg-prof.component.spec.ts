import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegProfComponent } from './reg-prof.component';

describe('RegProfComponent', () => {
  let component: RegProfComponent;
  let fixture: ComponentFixture<RegProfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegProfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
