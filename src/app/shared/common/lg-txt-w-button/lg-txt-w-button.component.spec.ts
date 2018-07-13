import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LgTxtWButtonComponent } from './lg-txt-w-button.component';

describe('LgTxtWButtonComponent', () => {
  let component: LgTxtWButtonComponent;
  let fixture: ComponentFixture<LgTxtWButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LgTxtWButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LgTxtWButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
