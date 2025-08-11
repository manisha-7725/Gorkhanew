import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-dialog-view',
  imports: [MatDialogModule, MatIcon, FormsModule, CommonModule],
  templateUrl: './dialog-view.html',
  styleUrl: './dialog-view.css',
})
export class DialogView {
  selectedVoucherNo = '';
  searchText = '';

  constructor(
    public dialogRef: MatDialogRef<DialogView>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close() {
    this.dialogRef.close();
  }

  dataRow = [
    {
      voucherno: 'PI63-KHT-82/83',
      date: '2025/08/10',
      invoiceNo: '6',
      supplier: 'Gorkha Brewery',
      amount: 'Rs 70,907.24',
    },
    {
      voucherno: 'PI63-KHT-82/83',
      date: '2025/08/10',
      invoiceNo: '123',
      supplier: 'Gorkha Brewery',
      amount: 'Rs 70,907.24',
    },
    {
      voucherno: 'PI63-KHT-82/83',
      date: '2025/08/10',
      invoiceNo: '123',
      supplier: 'Gorkha Brewery',
      amount: 'Rs 70,907.24',
    },
    {
      voucherno: 'PI63-KHT-82/83',
      date: '2025/08/10',
      invoiceNo: '123',
      supplier: 'Gorkha Brewery',
      amount: 'Rs 70,907.24',
    },
    {
      voucherno: 'PI61-KHT-82/83',
      date: '2025-08-08',
      invoiceNo: 'PI61-KHT-82/83',
      supplier: 'Gorkha Brewery',
      amount:'19809.89' ,
    },

    {
      voucherno: 'PI63-KHT-82/83',
      date: '2025-08-10',
      invoiceNo: '123',
      supplier: 'Gorkha Brewery',
      amount: '70907.24',
    },

    {
      voucherno: 'PI62-KHT-82/83',
      date: '2025-08-10',
      invoiceNo: 'Gorkha 123',
      supplier: 'Gorkha Brewery',
      amount:' 475437.57',
    },
  ];

  filteredData() {
    if (!this.searchText) return this.dataRow;

    return this.dataRow.filter(
      (item) =>
        item.voucherno.toLowerCase().includes(this.searchText.toLowerCase()) ||
        item.date.toLowerCase().includes(this.searchText.toLowerCase()) ||
        item.invoiceNo.toLowerCase().includes(this.searchText.toLowerCase()) ||
        item.supplier.toLowerCase().includes(this.searchText.toLowerCase()) ||
        item.amount.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

}
