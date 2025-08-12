import { CommonModule } from '@angular/common';
import { Component,  Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { Pagination } from '../pagination/pagination';

@Component({
  selector: 'app-dialog-view',
  imports: [MatDialogModule, MatIcon, FormsModule, CommonModule,Pagination ],
  templateUrl: './dialog-view.html',
  styleUrl: './dialog-view.css',
})
export class DialogView {
  selectedVoucherNo = 'VOUCHERNO';
  searchText = '';
  currentPage = 1;
  pageSize = 3;
   selectedRow: any; 

  constructor(
    public dialogRef: MatDialogRef<DialogView>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close() {
    this.dialogRef.close();
  }

  dataRow = [
    {
      voucherno: 'PI63-KHT-82/83',
      mfgdate: '10/08/2025',
      // expdate: '10/08/2025',
      invoiceNo: '6',
      supplier: 'Gorkha Brewery',
      amount: 'Rs 70,907.24',
      quantity:'12',
      rate:'2000',
      address: 'Kritiput',
      vatNo: '123456789',
      productcode:'10CBG567',
    },
    {
      voucherno: 'PI63-KHT-82/83',
       mfgdate: '10/08/2025',
      invoiceNo: '123',
      supplier: 'Gorkha Brewery',
      amount: 'Rs 70,907.24',
      quantity:'5',
       rate:'2000',
         address: 'Kritiput',
      vatNo: '123456789',
      productcode:'10CBG567',
    },
    {
      voucherno: 'PI63-KHT-82/83',
       mfgdate: '10/08/2025',
      invoiceNo: '123',
      supplier: 'Gorkha Brewery',
      amount: 'Rs 70,907.24',
      quantity:'12',
       rate:'2000',
         address: 'Kritiput',
      vatNo: '123456789',
      productcode:'10CBG567',
    },
    {
      voucherno: 'PI63-KHT-82/83',
       mfgdate: '10/08/2025',
      invoiceNo: '123',
      supplier: 'Gorkha Brewery',
      amount: 'Rs 70,907.24',
      quantity:'2',
       rate:'2000',
         address: 'Kritiput',
      vatNo: '123456789',
      productcode:'10CBG567',
    },
    {
      voucherno: 'PI61-KHT-82/83',
      mfgdate: '10/08/2025',
      invoiceNo: 'PI61-KHT-82/83',
      supplier: 'Gorkha Brewery',
      amount:'19809.89' ,
      quantity:'12',
       rate:'2000',
         address: 'Kritiput',
      vatNo: '123456789',
      productcode:'10CBG567',
    },

    {
      voucherno: 'PI63-KHT-82/83',
      mfgdate: '10/08/2025',
      invoiceNo: '123',
      supplier: 'Gorkha Brewery',
      amount: '70907.24',
      quantity:'12',
      rate:'2000',
        address: 'Kritiput',
      vatNo: '123456789',
      productcode:'10CBG567',
      
    },

    {
      voucherno: 'PI62-KHT-82/83',
      mfgdate: '10/08/2025',
      invoiceNo: 'Gorkha 123',
      supplier: 'Gorkha Brewery',
      amount:' 475437.57',
      quantity:'12',
       rate:'2000',
         address: 'Kritiput',
      vatNo: '123456789',
      productcode:'10CBG567',
    },
    {
      voucherno: 'PI62-KHT-82/83',
      mfgdate: '10/08/2025',
      invoiceNo: 'Gorkha 123',
      supplier: 'Gorkha Brewery',
      amount:' 475437.57',
      quantity:'12',
       rate:'2000',
         address: 'Kritiput',
      vatNo: '123456789',
      productcode:'10CBG567',
    },
    {
      voucherno: 'PI62-KHT-82/83',
      mfgdate: '10/08/2025',
      invoiceNo: 'Gorkha 123',
      supplier: 'Gorkha Brewery',
      amount:' 475437.57',
      quantity:'12',
       rate:'2000',
    address: 'Kritiput',
      vatNo: '123456789',
      productcode:'10CBG567',
    },
    {
      voucherno: 'PI62-KHT-82/83',
      mfgdate: '10/08/2025',
      invoiceNo: 'Gorkha 123',
      supplier: 'Gorkha Brewery',
      amount:' 475437.57',
      quantity:'12',
      rate:'2000',
       address: 'Kritiput',
      vatNo: '123456789',
      productcode:'10CBG567',
    },
  ];

  Data() {
    if (!this.searchText) return this.dataRow;

    return this.dataRow.filter(
      (item) =>
        item.voucherno.toLowerCase().includes(this.searchText.toLowerCase()) ||
        item.mfgdate.toLowerCase().includes(this.searchText.toLowerCase()) ||
        item.invoiceNo.toLowerCase().includes(this.searchText.toLowerCase()) ||
        item.supplier.toLowerCase().includes(this.searchText.toLowerCase()) ||
        item.amount.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

//  get filteredData() {
//     if (!this.searchText) return this.dataRow;

//     const search = this.searchText.toLowerCase();
//     return this.dataRow.filter(
//       item =>
//         item.voucherno.toLowerCase().includes(search) ||
//         item.date.toLowerCase().includes(search) ||
//         item.invoiceNo.toLowerCase().includes(search) ||
//         item.supplier.toLowerCase().includes(search) ||
//         item.amount.toString().toLowerCase().includes(search)
//     );
//   }

  get totalPages() {
  return Math.ceil(this.Data().length / this.pageSize) || 1;
}

get pagedData() {
  const startIndex = (this.currentPage - 1) * this.pageSize;
  return this.Data().slice(startIndex, startIndex + this.pageSize);
}


  onPageChange(page: number) {
    this.currentPage = page;
  }


selectRow(row: any) {
  this.dialogRef.close(row); // close dialog and send selected row data back
}


onRowDoubleClick(dataRow: any) {
    this.dialogRef.close(dataRow); // send data back to Transaction
  }



//  this.dialogRef.close(this.selectedRow);



  



  
}
