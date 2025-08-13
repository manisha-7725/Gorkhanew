import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
  standalone: true,
  selector: 'app-dialog-box',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './dialog-box.html',
  styleUrl: './dialog-box.css',
})
export class DialogBox {
  selectedRow: Row | null = null;
  searchtext: string = '';

  // Supplier list for supplier selection
  supplierData = [
    {
      name: 'Gorkha Brewery',
      code: 'C001',
      address: 'Kritipur',
      vatNo: '123456789',
    },
    {
      name: 'Raj Brewery',
      code: 'C002',
      address: 'Kritipur',
      vatNo: '123456789',
    },
  ];

  constructor(
    public dialogRef: MatDialogRef<DialogBox>,
    @Inject(MAT_DIALOG_DATA) public dialogRows: Row[] // Used for product selection
  ) {}

  // --- Double click: Product row selection ---
  onRowDoubleClick(row: Row) {
    this.dialogRef.close({ selectedRow: row });
  }

  // --- Double click: Supplier selection ---
  SupplierDoubleClick(item: any) {
    this.dialogRef.close(item);
  }

  // --- Search filter for suppliers ---
  get filteredData() {
    if (!this.searchtext.trim()) return this.supplierData;
    const search = this.searchtext.toLowerCase();
    return this.supplierData.filter(
      (item) =>
        item.name.toLowerCase().includes(search) ||
        item.code.toLowerCase().includes(search) ||
        item.address.toLowerCase().includes(search) ||
        item.vatNo.toLowerCase().includes(search)
    );
  }



  
  // --- Search filter for product rows ---
  // get filteredDialogRows() {
  //   if (!this.searchtext.trim()) return this.dialogRows;
  //   const search = this.searchtext.toLowerCase();
  //   return this.dialogRows.filter(
  //     (row) =>
  //       row.productName.toLowerCase().includes(search) ||
  //       row.productCode.toLowerCase().includes(search) ||
  //       row.hsCode.toLowerCase().includes(search) ||
  //       row.mfgDate.toLowerCase().includes(search)
  //   );
  // }



}
