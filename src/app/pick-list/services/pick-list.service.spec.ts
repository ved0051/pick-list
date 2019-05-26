import { TestBed, inject } from '@angular/core/testing';

import { PickListService } from './pick-list.service';

describe('PickListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PickListService]
    });
  });

  it('should be created', inject([PickListService], (service: PickListService) => {
    expect(service).toBeTruthy();
  }));
});
