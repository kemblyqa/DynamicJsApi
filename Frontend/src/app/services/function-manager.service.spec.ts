import { TestBed } from '@angular/core/testing';

import { FunctionManagerService } from './function-manager.service';

describe('FunctionManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FunctionManagerService = TestBed.get(FunctionManagerService);
    expect(service).toBeTruthy();
  });
});
