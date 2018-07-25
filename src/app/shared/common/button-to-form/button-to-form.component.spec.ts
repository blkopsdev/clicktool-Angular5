import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonToFormComponent } from './button-to-form.component';

describe('ButtonToFormComponent', () => {
  let component: ButtonToFormComponent;
  let fixture: ComponentFixture<ButtonToFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonToFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonToFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
