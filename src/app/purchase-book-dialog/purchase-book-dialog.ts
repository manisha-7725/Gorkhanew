import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NepalidatePicker } from '../nepalidate-picker/nepalidate-picker';
import { FormsModule } from '@angular/forms';
import { MasterRepo } from '../master-repo';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { ReportData } from '../report-data/report-data';
import { Purchase } from '../services/purchase';


export interface ReportRow {
  date: string;
  miti: string;
  billNo: string;
  supplier: string;
  gross: number;
  netAmt: number;
  discount: number;
  trnMode: string;
}

@Component({
  selector: 'app-purchase-book-dialog',
  imports: [MatDialogModule, MatButtonModule, MatIconModule, NepalidatePicker, FormsModule, CommonModule,RouterLink ,ReportData],
  templateUrl: './purchase-book-dialog.html',
  styleUrl: './purchase-book-dialog.css'
})
export class PurchaseBookDialog {
// form fields
  invoiceDate: string = '';
  mfgNepaliDate: string = '';
  toDateAD: string = '';
  toDateBS: string = '';
  supplier: string = '';
  gross: number = 0;
  netAmt: number = 0;
   discount = 0;
  trnMode = 'credit';

reportType: string = 'voucherWise';
voucherReportFormat: string = 'detail'; 
monthReportFormat: string = 'ad';   

  formData: ReportRow = {
    date: '',
    miti: '',
    billNo: '',
    supplier: '',
    gross: 0,
    netAmt: 0,
    discount: 0,
    trnMode: 'credit',
  };

constructor(private masterRepo: MasterRepo,
  private router: Router,
  private dialogRef: MatDialogRef<PurchaseBookDialog> ,
  private purchaseService: Purchase
) {}

  




runReport() {
  this.dialogRef.close(this.formData); // pass form data back to parent
    this.router.navigate(['/report-data']);
  const row: ReportRow = {
    date: this.invoiceDate,
    miti: this.mfgNepaliDate,
    billNo: 'AUTO-GEN-' + Math.floor(Math.random() * 1000),
    supplier: this.supplier || 'Default Supplier',
    gross: this.gross,
    netAmt: this.netAmt,
    discount: this.discount,
    trnMode: this.trnMode,
  };

  // Save to json-server
  this.purchaseService.addReport(row).subscribe({
    next: (res) => {
      console.log('Data saved to API:', res);
      this.dialogRef.close(res); // close dialog and return data
    },
    error: (err) => console.error('Error saving data:', err)
  });
}




 closeDialog() {
    this.dialogRef.close();
  }

todayNepaliDate(date: Date): string {
  return '2082-05-12';
}

onNepaliDateChange(bsDate: string) {
    this.mfgNepaliDate = bsDate;
    this.invoiceDate = this.masterRepo.toADDate(bsDate);
  }

 
 onEnglishDateChange(adDate: string) {
  this.invoiceDate = adDate;
  const bsDate = this.masterRepo.toBSDate(adDate);
  this.mfgNepaliDate = bsDate;

  const pickerInput = document.getElementById('invoiceDateBSPicker') as HTMLInputElement;
  if (pickerInput) {
    pickerInput.value = bsDate;
  }
 }

 onToNepaliDateChange(bsDate: string) {
  this.toDateBS = bsDate;
  this.toDateAD = this.masterRepo.toADDate(bsDate);
}

onToEnglishDateChange(adDate: string) {
  this.toDateAD = adDate;
  const bsDate = this.masterRepo.toBSDate(adDate);
  this.toDateBS = bsDate;

  const pickerInput = document.getElementById('toDateBSPicker') as HTMLInputElement;
  if (pickerInput) {
    pickerInput.value = bsDate;
  }}

}
