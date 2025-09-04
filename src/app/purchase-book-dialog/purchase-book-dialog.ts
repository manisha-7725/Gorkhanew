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


@Component({
  selector: 'app-purchase-book-dialog',
  imports: [MatDialogModule, MatButtonModule, MatIconModule, NepalidatePicker, FormsModule, CommonModule,RouterLink],
  templateUrl: './purchase-book-dialog.html',
  styleUrl: './purchase-book-dialog.css'
})
export class PurchaseBookDialog {

constructor(private masterRepo: MasterRepo,
  private router: Router,
  private dialogRef: MatDialogRef<PurchaseBookDialog> 
) {}

mfgNepaliDate: string = '';
invoiceDate: string = '';
reportType: string = 'voucherWise';   

voucherReportFormat: string = 'detail'; 
monthReportFormat: string = 'ad';       
 toDateAD: string = '';
toDateBS: string = '';

todayNepaliDate(date: Date): string {
  return '2082-05-12';
}

runReport() {
    this.dialogRef.close(); 
    this.router.navigate(['/report-data']);
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
