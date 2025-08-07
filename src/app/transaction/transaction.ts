import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogBox } from '../dialog-box/dialog-box';



interface Row {
  hsCode: string;
  productCode: string;
  productName: string;
  upc: string;
  unit: string;
  quantity: string;
  rate: string;
  gAmt: string;
  netAmt: string;
  mfgDate: string;
  expDate: string;
}

@Component({
  selector: 'app-transaction',
  imports: [CommonModule, FormsModule],
  templateUrl: './transaction.html',
  styleUrls: ['./transaction.css']
})
export class Transaction implements AfterViewInit {
  @ViewChildren('hsCodeInput') hsCodeInputs!: QueryList<ElementRef>;

  selectedPayment: string = '';


  

  rows: Row[] = [
    {
      hsCode: '',
      productCode: '',
      productName: '',
      upc: '',
      unit: '',
      quantity: '0.00',
      rate: '0.00',
      gAmt: '0.00',
      netAmt: '0.00',
      mfgDate: '',
      expDate: ''
    }
  ];

  showConfirm = false;
  indexToDelete: number | null = null;

  constructor(private router: Router, private dialog: MatDialog) {}

 openRowDialog(row: Row) {
    this.dialog.open(DialogBox, {
      width: '375px',
        position: { right: '0' },
      data: {
        dialogRows: this.rows,
        selectedRow: row,
      },
      
    });
  }


  ngAfterViewInit() {
    this.focusLastHSCode();
  }

  goBack() {
    this.router.navigate(['/master']);
  }

  ngOnInit(): void {
  const dialogRef = this.dialog.open(DialogBox, {
    width: '375px',
    position: { right: '0' },
  
    data: this.rows
  });

  dialogRef.afterClosed().subscribe((updatedRows) => {
    if (updatedRows) {
      this.rows = updatedRows;
    }
  });
}
dialogRows: Row[] = []; 
selectedRow: Row | null = null;


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogBox, {
      width: '100%',
      position: { right: '0' },
     data: {
      dialogRows: this.dialogRows,       // send current dialog data
      selectedRow: this.selectedRow      // send current selection
    }
    });

   dialogRef.afterClosed().subscribe((result) => {
  if (result?.selectedRow) {
    // ✅ Handle double-click selection
    const index = this.rows.findIndex(r => r.productCode === result.selectedRow.productCode);
    if (index !== -1) {
      this.rows[index] = result.selectedRow; // update existing
    } else {
      this.rows.push(result.selectedRow); // add new if not found
    }
  } else if (result?.updatedRows) {
    // ✅ Handle after clicking 'Close' button
    this.rows = result.updatedRows;
  }
});

  }
  

  addRow() {
    this.rows.push({
      hsCode: '',
      productCode: '',
      productName: '',
      upc: '',
      unit: '',
      quantity: '0.00',
      rate: '0.00',
      gAmt: '0.00',
      netAmt: '0.00',
      mfgDate: '',
      expDate: ''
    });

 
    setTimeout(() => this.focusLastHSCode());
  }

  focusLastHSCode() {
    const lastInput = this.hsCodeInputs.last;
    if (lastInput) {
      lastInput.nativeElement.focus();
    }
  }

  confirmRemoveRow(index: number) {
    this.indexToDelete = index;
    this.showConfirm = true;
  }

  deleteConfirmed() {
    if (this.indexToDelete !== null) {
      this.removeRow(this.indexToDelete);
    }
    this.showConfirm = false;
    this.indexToDelete = null;
  }

  cancelDelete() {
    this.showConfirm = false;
    this.indexToDelete = null;
  }

  removeRow(index: number) {
    this.rows.splice(index, 1);
  }

  isDisabled = true;
}
