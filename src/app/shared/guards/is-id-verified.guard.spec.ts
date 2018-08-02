import { TestBed, async, inject } from '@angular/core/testing';

import { IsIdVerifiedGuard } from './is-id-verified.guard';

describe('IsIdVerifiedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsIdVerifiedGuard]
    });
  });

  it('should ...', inject([IsIdVerifiedGuard], (guard: IsIdVerifiedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
