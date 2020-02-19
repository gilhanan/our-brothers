import { TestBed, async, inject } from '@angular/core/testing';

import { HostGuard } from './host.guard';

describe('HostGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HostGuard]
    });
  });

  it('should ...', inject([HostGuard], (guard: HostGuard) => {
    expect(guard).toBeTruthy();
  }));
});
