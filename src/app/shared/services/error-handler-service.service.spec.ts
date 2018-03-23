import { TestBed, inject } from '@angular/core/testing';

import { ErrorHandlerServiceService } from './error-handler-service.service';

describe('ErrorHandlerServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorHandlerServiceService]
    });
  });

  it('should be created', inject([ErrorHandlerServiceService], (service: ErrorHandlerServiceService) => {
    expect(service).toBeTruthy();
  }));
});
