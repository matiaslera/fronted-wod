import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegClientComponent } from './reg-client.component';

describe('RegClientComponent', () => {
  let component: RegClientComponent;
  let fixture: ComponentFixture<RegClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
