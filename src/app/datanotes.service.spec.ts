import { TestBed } from '@angular/core/testing';

import { DatanotesService } from './datanotes.service';

describe('DatanotesService', () => {
  let service: DatanotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatanotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
