import { TestBed, async, inject } from '@angular/core/testing';

import { VorGuardGuard } from './vor-guard.guard';

describe('VorGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VorGuardGuard]
    });
  });

  it('should ...', inject([VorGuardGuard], (guard: VorGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
