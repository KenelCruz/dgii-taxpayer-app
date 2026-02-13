import { TestBed } from '@angular/core/testing';

import { TaxReceiptService } from './tax-receipt.service';

describe('TaxReceiptService', () => {
  let service: TaxReceiptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxReceiptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
