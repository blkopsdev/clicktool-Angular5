import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YellowboxComponent } from './yellowbox.component';

describe('YellowboxComponent', () => {
  let component: YellowboxComponent;
  let fixture: ComponentFixture<YellowboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YellowboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YellowboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
