import { TestBed } from '@angular/core/testing';

import { ParticipationsService } from './participations.service';

describe('ParticipationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParticipationsService = TestBed.get(ParticipationsService);
    expect(service).toBeTruthy();
  });
});
