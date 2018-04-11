import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineAnimationComponent } from './machine-animation.component';

describe('MachineAnimationComponent', () => {
  let component: MachineAnimationComponent;
  let fixture: ComponentFixture<MachineAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
