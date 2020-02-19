import { TestBed, async, inject } from '@angular/core/testing';

import { ParticipateGuard } from './participate.guard';

describe('ParticipateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParticipateGuard]
    });
  });

  it('should ...', inject([ParticipateGuard], (guard: ParticipateGuard) => {
    expect(guard).toBeTruthy();
  }));
});
