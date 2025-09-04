import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PurchaseBookDialog } from '../purchase-book-dialog/purchase-book-dialog';



interface ReportRow {
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
  selector: 'app-report-data',
  imports: [CommonModule, ],
  templateUrl: './report-data.html',
  styleUrl: './report-data.css'
})
export class ReportData {
  constructor(private dialog: MatDialog) {}

openPurchaseBookDialog() {
  const dialogRef = this.dialog.open(PurchaseBookDialog, {
    width: '600px',
  });

  dialogRef.afterClosed().subscribe((result: ReportRow) => {
    if (result) {
      this.data.push(result); // add new row to table
    }
  });
}




// dummy data
  data: ReportRow[] = [
    { date: '09-01-2025', miti: '16/05/2082', billNo: 'PI16-KH1-82/83', supplier: 'PI16-KH1-82/83',trnMode:'credit' ,gross: 1200, netAmt: 1100, discount:100 },
    { date: '09-01-2025', miti: '16/05/2082', billNo: 'PI16-KH1-82/83', supplier: 'PI16-KH1-82/83',trnMode:'credit' ,gross: 1200, netAmt: 1100, discount:100 },
    { date: '09-01-2025', miti: '16/05/2082', billNo: 'PI16-KH1-82/83', supplier: 'PI16-KH1-82/83',trnMode:'credit' ,gross: 1200, netAmt: 1100, discount:100 },
    { date: '09-01-2025', miti: '16/05/2082', billNo: 'PI16-KH1-82/83', supplier: 'PI16-KH1-82/83',trnMode:'credit' ,gross: 1200, netAmt: 1100, discount:100 },
    { date: '09-01-2025', miti: '16/05/2082', billNo: 'PI16-KH1-82/83', supplier: 'PI16-KH1-82/83',trnMode:'credit' ,gross: 1200, netAmt: 1100, discount:100 },
   
    // add more rows...
  ];


getTotal(field: 'gross' | 'netAmt' | 'discount'): number {
  return this.data.reduce((sum, row) => sum + row[field], 0);
}


}
