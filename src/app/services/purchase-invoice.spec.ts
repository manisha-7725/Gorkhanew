import { TestBed } from '@angular/core/testing';

import { PurchaseInvoice } from './purchase-invoice';

describe('PurchaseInvoice', () => {
  let service: PurchaseInvoice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseInvoice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
