import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WireInfoComponent } from './wire-info.component';

describe('WireInfoComponent', () => {
  let component: WireInfoComponent;
  let fixture: ComponentFixture<WireInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WireInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WireInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
