import { TestBed } from '@angular/core/testing';

import { TextsFromSiblingsService } from './texts-from-siblings.service';

describe('TextsFromSiblingsService', () => {
  let service: TextsFromSiblingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextsFromSiblingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
