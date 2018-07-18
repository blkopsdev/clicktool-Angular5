import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTogglerComponent } from './form-toggler.component';

describe('FormTogglerComponent', () => {
  let component: FormTogglerComponent;
  let fixture: ComponentFixture<FormTogglerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTogglerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTogglerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
