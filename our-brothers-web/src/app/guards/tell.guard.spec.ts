import { TestBed, async, inject } from '@angular/core/testing';

import { TellGuard } from './tell.guard';

describe('TellGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TellGuard]
    });
  });

  it('should ...', inject([TellGuard], (guard: TellGuard) => {
    expect(guard).toBeTruthy();
  }));
});
