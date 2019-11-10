import { TestBed } from '@angular/core/testing';

import { FunctionDialogService } from './function-dialog.service';

describe('FunctionDialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FunctionDialogService = TestBed.get(FunctionDialogService);
    expect(service).toBeTruthy();
  });
});
