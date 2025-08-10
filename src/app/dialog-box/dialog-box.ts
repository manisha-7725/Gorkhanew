import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';



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
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    CommonModule,
    
  ],
  templateUrl: './dialog-box.html',
  styleUrl: './dialog-box.css',
})
export class DialogBox {
  newRow: Row = {
    productName: '',
    productCode: '',
    hsCode: '',
    upc: '',
    unit: '',
    quantity: '',
    rate: '',
    gAmt: '',
    netAmt: '',
    mfgDate: '',
    expDate: '',
  };
public data: Row[];
  constructor(
    public dialogRef: MatDialogRef<DialogBox>,
    @Inject(MAT_DIALOG_DATA) public dialogRows: Row[] 
  ) {
    this.data = dialogRows;
  }
selectedRow: any = null;

selectRow(row: any) {
  this.selectedRow = row;
}
  ngOnInit(): void {
    console.log(this.dialogRows); 
  }
  addRow(): void {
  
    this.dialogRows.push({ ...this.newRow });

    this.newRow = {
      productName: '',
      productCode: '',
      hsCode: '',
      upc: '',
      unit: '',
      quantity: '',
      rate: '',
      gAmt: '',
      netAmt: '',
      mfgDate: '',
      expDate: '',
    };
  }

  closeDialog(): void {
    this.dialogRef.close(this.dialogRows); 
  }

  selectedName: string = '';
  searchtext: string = '';
  
onRowDoubleClick(row: Row) {
  this.dialogRef.close({ selectedRow: row }); 
}


 supplierData = [
    {
      name: 'Gorkha Brewery',
      code: 'C001',
      address: 'Kritiput',
      vatNo: '123456789',
    },
    {
      name: 'Raj Brewery',
      code: 'C002',
      address: 'Kritiput',
      vatNo: '123456789',
    },
  ];

get filteredData() {
  if (!this.searchtext || this.searchtext.trim() === '') return this.supplierData;
  const search = this.searchtext.toLowerCase();
  return this.supplierData.filter(item =>
    item.name.toLowerCase().includes(search) ||
    item.code.toLowerCase().includes(search) ||
    item.address.toLowerCase().includes(search) ||
    item.vatNo.toLowerCase().includes(search)
  );
}


get filteredDialogRows() {
  if (!this.searchtext || this.searchtext.trim() === '') return this.dialogRows;
  const search = this.searchtext.toLowerCase();
  return this.dialogRows.filter(row =>
    row.productName.toLowerCase().includes(search) ||
    row.productCode.toLowerCase().includes(search) ||
    row.hsCode.toLowerCase().includes(search) ||
    row.mfgDate.toLowerCase().includes(search)
  );
}

}