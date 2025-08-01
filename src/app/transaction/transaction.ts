import { CommonModule } from '@angular/common';
import { Component,signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { routes } from '../app.routes';


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

export class Transaction {
constructor(private router: Router) {}

selectedPayment: string = '';


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
  }

 


showConfirm = false;
indexToDelete: number | null = null;

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



}