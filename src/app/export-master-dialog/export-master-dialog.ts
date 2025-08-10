import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
   standalone: true,
  selector: 'app-export-master-dialog',
  imports: [ MatButtonModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    CommonModule,],
  templateUrl: './export-master-dialog.html',
  styleUrl: './export-master-dialog.css'
})


export class ExportMasterDialog {


constructor(public dialogRef: MatDialogRef<ExportMasterDialog>) {}

 exportData = [
    { ProductCode: 'P001', ProductName: 'Product 1', Price: 100 },
    { ProductCode: 'P002', ProductName: 'Product 2', Price: 200 },
  ];

  productData = [
    { Code: 'PRD001', Name: 'Product A', Category: 'Cat1', Price: 150 },
    { Code: 'PRD002', Name: 'Product B', Category: 'Cat2', Price: 250 },
  ];


  exportToExcel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.exportData);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'PriceMaster': worksheet },
      SheetNames: ['PriceMaster'],
    };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'PriceMasterExport.xlsx');

  }

}
