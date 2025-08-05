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
// import { Row } from '../models/row.model'; // Update path as needed


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
constructor(
    public dialogRef: MatDialogRef<DialogBox>,
@Inject(MAT_DIALOG_DATA) public dialogRows: Row[]

  ) {}

  ngOnInit(): void {
    console.log(this.dialogRows); // 👀 Now you can display or edit these rows in the dialog
  }

  // Optional: Close and return updated rows
  closeDialog(): void {
    this.dialogRef.close(this.dialogRows);
  }












  selectedName: string = '';

  data = [
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




  

}
