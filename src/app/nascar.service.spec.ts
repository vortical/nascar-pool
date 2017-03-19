import { TestBed, inject } from '@angular/core/testing';

import { NascarService } from './nascar.service';

describe('NascarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NascarService]
    });
  });

  it('should ...', inject([NascarService], (service: NascarService) => {
    expect(service).toBeTruthy();
  }));
});
