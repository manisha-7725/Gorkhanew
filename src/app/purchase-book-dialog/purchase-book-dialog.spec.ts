import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseBookDialog } from './purchase-book-dialog';

describe('PurchaseBookDialog', () => {
  let component: PurchaseBookDialog;
  let fixture: ComponentFixture<PurchaseBookDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseBookDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseBookDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
