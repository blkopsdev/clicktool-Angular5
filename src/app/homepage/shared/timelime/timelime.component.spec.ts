import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelimeComponent } from './timelime.component';

describe('TimelimeComponent', () => {
  let component: TimelimeComponent;
  let fixture: ComponentFixture<TimelimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
