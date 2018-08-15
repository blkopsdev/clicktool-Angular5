import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtPreloaderComponent } from './ct-preloader.component';

describe('CtPreloaderComponent', () => {
  let component: CtPreloaderComponent;
  let fixture: ComponentFixture<CtPreloaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtPreloaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtPreloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
