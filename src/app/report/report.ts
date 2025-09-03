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
  event.preventDefault();       // prevent default link behavior
  event.stopPropagation();      // prevent dropdown from closing
  this.dialog.open(PurchaseBookDialog, {
  width: '1200px',    // wider
  height: '90vh',     // almost full height of viewport
  maxWidth: '95vw', 
  });
}



}
