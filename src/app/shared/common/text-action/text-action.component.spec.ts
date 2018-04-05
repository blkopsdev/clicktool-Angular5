import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextActionComponent } from './text-action.component';

describe('TextActionComponent', () => {
  let component: TextActionComponent;
  let fixture: ComponentFixture<TextActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
