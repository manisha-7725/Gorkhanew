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


@Component({
  selector: 'app-product-dialog',
  imports: [ CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,],
  templateUrl: './product-dialog.html',
  styleUrl: './product-dialog.css'
})







export class ProductDialog {
constructor(
  public dialogRef: MatDialogRef<ProductDialog>
) {}

selectProduct(product: any) {
  this.dialogRef.close({ selectedRow: product });
}




products =[
  {
      description: 'Beer',
      itemcode: '2082',
      stock: '',
      stockCase: '',
      groupname: 'PRODUCT LIST',
      stockeach: '',
      rate:'2000',
    },
  {
      description: 'Beer 4',
      itemcode: '2082',
      stock: '7512',
      stockCase: '625',
      groupname: 'PRODUCT LIST',
      stockeach: '11',
    },
  {
      description: 'Carlsberg 500mlCan',
      itemcode: '2082',
      stock: '7512',
      stockCase: '625',
      groupname: 'PRODUCT LIST',
      stockeach: '11',
    },
  {
      description: 'Gorkha 330ml Bottle',
      itemcode: '2082',
      stock: '7512',
      stockCase: '625',
      groupname: 'PRODUCT LIST',
      stockeach: '11',
    },
  {
      description: 'Beer',
      itemcode: '2082',
      stock: '7512',
      stockCase: '625',
      groupname: 'PRODUCT LIST',
      stockeach: '11',
    },
  {
      description: 'Beer',
      itemcode: '2082',
      stock: '7512',
      stockCase: '625',
      groupname: 'PRODUCT LIST',
      stockeach: '11',
    },
  {
      description: 'Beer',
      itemcode: '2082',
      stock: '7512',
      stockCase: '625',
      groupname: 'PRODUCT LIST',
      stockeach: '11',
    },
  {
      description: 'Beer',
      itemcode: '2082',
      stock: '7512',
      stockCase: '625',
      groupname: 'PRODUCT LIST',
      stockeach: '11',
    },
   
]
}
