import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PurchaseBookDialog } from '../purchase-book-dialog/purchase-book-dialog';

@Component({
  selector: 'app-report',
  imports: [],
  templateUrl: './report.html',
 styleUrls: ['./report.css']

})
export class Report {
  constructor(private dialog: MatDialog) {}


openPurchaseBookDialog(event: Event) {
  event.preventDefault();       
  event.stopPropagation();     
  this.dialog.open(PurchaseBookDialog, {
  width: '1200px',   
  height: '90vh',     
  maxWidth: '95vw', 
  });
}

}
