import { CommonModule } from '@angular/common';
import { Component,signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
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
  imports: [CommonModule,FormsModule,],
  templateUrl: './transaction.html',
  styleUrl: './transaction.css'
})

export class Transaction implements AfterViewInit{
    @ViewChildren('hsCodeInput') hsCodeInputs!: QueryList<ElementRef>;

constructor(private router: Router,private dialog: MatDialog) {}
selectedPayment: string = '';


ngOnInit(): void {
  const dialogRef = this.dialog.open(DialogBox, {
    width: '375px',
    position: { right: '0' },
    data: this.rows
  });

  dialogRef.afterClosed().subscribe((updatedRows: Row[]) => {
    if (updatedRows) {
      this.rows = updatedRows; // 📝 Update the transaction table
    }
  });
}




goBack() {
  this.router.navigate(['/master']);
}
headers=["PI.No","PI35-KHT-82/83"];

 rows: Row[] = [
    {
      hsCode: '',
      productCode: '',
      productName: 'Press Enter',
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

 ngAfterViewInit() {
    this.focusLastHSCode();
  }


  addRow() {
    this.rows.push({
      hsCode: '',
      productCode: '',
      productName: 'Press Enter',
      upc: '',
      unit: '',
      quantity: '0.00',
      rate: '0.00',
      gAmt: '0.00',
      netAmt: '0.00',
      mfgDate: '',
      expDate: ''
    });
  

 // Let Angular render the row first, then focus
    setTimeout(() => this.focusLastHSCode());
  }


// showConfirm = false;
// indexToDelete: number | null = null;

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