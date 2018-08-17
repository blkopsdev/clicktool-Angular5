import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VorComponent } from './vor.component';

describe('VorComponent', () => {
  let component: VorComponent;
  let fixture: ComponentFixture<VorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
