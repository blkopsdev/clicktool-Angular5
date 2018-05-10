import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeGearComponent } from './large-gear.component';

describe('LargeGearComponent', () => {
  let component: LargeGearComponent;
  let fixture: ComponentFixture<LargeGearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LargeGearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LargeGearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
