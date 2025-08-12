import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogBox } from '../dialog-box/dialog-box';
import { TransactionData } from '../services/transaction-data';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { DialogView } from '../dialog-view/dialog-view';


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
  selector: 'app-transaction',
  imports: [CommonModule, FormsModule],
  templateUrl: './transaction.html',
  styleUrls: ['./transaction.css']
})
export class Transaction implements AfterViewInit {
  @ViewChildren('hsCodeInput') hsCodeInputs!: QueryList<ElementRef>;
  @ViewChild('form1') form1!: NgForm;
@ViewChild('form2') form2!: NgForm;
@ViewChild('form3') form3!: NgForm;

  selectedPayment: string = '';
  showConfirm = false;
   account: string = ''; 

  rows: Row[] = [
    {
      hsCode: '',
      productCode: '',
      productName: '',
      upc: '',
      unit: '',
      quantity: '0.00',
      rate: '0.00',
      gAmt: '0.00',
      netAmt: '0.00',
      mfgDate: '',
      expDate: '',
     
    }
  ];

invoiceNo: string = '';
invoiceDate: string = '';
chequeNo1:string=''
chequeNo2:string=''
address: string = '';
vatNo: string = '';
remark: string = '';
supplierName = '';
mfgDate: string = '';
expDate: string = '';


resetData() {
  this.rows = [
    {
      hsCode: '',
      productCode: '',
      productName: '',
      upc: '',
      unit: '',
      quantity: '0.00',
      rate: '0.00',
      gAmt: '0.00',
      netAmt: '0.00',
      mfgDate: '',
      expDate: '',
      
    }
  ];
  
  this.selectedPayment = '';
  this.showConfirm = false;
  this.indexToDelete = null;
  this.showReceivedModal = false;
  this.selectedName = '';
  this.searchtext = '';
  this.selectedRow = null;
  

  if (this.form1) this.form1.resetForm();
  if (this.form2) this.form2.resetForm();
  if (this.form3) this.form3.resetForm();
  // If you have any other variables that hold user input, reset them here similarly.
}


 
  indexToDelete: number | null = null;

  constructor(private router: Router, private dialog: MatDialog,private transactionService: TransactionData) {}
rowss: any[] = [];



setSelectedRow(row: any) {
  this.selectedRow = row;
}

openViewDialog(row: any) {
 
  this.dialog.open(DialogView, {
    width: '800px',
    data: row
  });
}

 openRowDialog(row: Row) {
    this.dialog.open(DialogBox, {
      width: '375px',
        position: { right: '0' },
      data: {
        dialogRows: this.rows,
        selectedRow: row,
      },
      
    });
  }
showDialog: boolean = false;

showRowInDialog(row: any) {
  this.selectedRow = { ...row }; // create a copy to edit
  this.showDialog = true; 
    const dialogRef = this.dialog.open(DialogBox, {
   
    data: [...this.rows], 
  });

}

  ngAfterViewInit() {
    this.focusLastHSCode();
  }

  goBack() {
    this.router.navigate(['/master']);
  }
  

  ngOnInit(): void {
  const dialogRef = this.dialog.open(DialogBox, {
    width: '375px',
    position: { right: '0' },
  disableClose: true ,
    data: this.rows
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // result is the selected supplier object from dialog
      this.supplierName = result.name || '';
      this.account = result.name || '';
      this.address = result.address || '';
      this.vatNo = result.vatNo || '';
      this.invoiceDate = result.invoiceDate || this.invoiceDate; // keep today's if none returned
      setTimeout(() => this.focusLastProductName(), 0);
      this.remark = ''; 
    }
  const today = new Date();
  this.invoiceDate = today.toISOString().substring(0, 10);
  this.mfgDate = today.toISOString().substring(0,10)

  });


  
}



dialogRows: Row[] = []; 
selectedRow: Row | null = null;


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogBox, {
      width: '100%',
      position: { right: '0' },
     data: {
      dialogRows: this.rows,      
      selectedRow: this.selectedRow      
    }
    });

dialogRef.afterClosed().subscribe((result) => {
    if (result?.selectedRow) {
      const index = this.rows.findIndex(r => r.productCode === result.selectedRow.productCode);
      if (index !== -1) {
        this.rows[index] = result.selectedRow;
      } else {
        this.rows.push(result.selectedRow);
      }
    } else if (result?.updatedRows) {
      this.rows = result.updatedRows;
    }
  });

}
  
dialogRef: any;

  selectedName: string = '';
  searchtext: string = '';
  
onRowDoubleClick(row: Row) {
  this.dialogRef.close({ selectedRow: row }); 
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

  addRow() {
    this.rows.push({
      hsCode: '',
      productCode: '',
      productName: '',
      upc: '',
      unit: '',
      quantity: '0.00',
      rate: '0.00',
      gAmt: '0.00',
      netAmt: '0.00',
      mfgDate: '',
      expDate: ''
    });
  setTimeout(() => this.focusLastHSCode());
  }
 @ViewChildren('productNameInput') productNameInputs!: QueryList<ElementRef>;


  focusLastHSCode() {
    const lastInput = this.hsCodeInputs.last;
    if (lastInput) {
      lastInput.nativeElement.focus();
    }
  }

  confirmRemoveRow(index: number) {
    this.indexToDelete = index;
    this.showConfirm = true;
  }
  

  deleteConfirmed() {
    if (this.indexToDelete !== null) {
      this.removeRow(this.indexToDelete);
    }
    this.showConfirm = false;
    this.indexToDelete = null;
  }

  cancelDelete() {
    this.showConfirm = false;
    this.indexToDelete = null;
  }

  removeRow(index: number) {
    this.rows.splice(index, 1);
  }


isDisabled = true;
showReceivedModal = false;
showNoDataDialog = false;
msg=' ⚠️ Information !!!';
alertMessage = 'Supplier can not be null';

closeAlert() {
  this.showNoDataDialog = false;
}

onReceivedClick() {
  if (this.rows && this.rows.length > 0 && this.rows.some(row => row.hsCode.trim() !== '')) {
    this.printData();
  } else {
    this.showNoDataDialog = true;
  }
}




printData() {
  let printContents = `
    <h2>Transaction Data</h2>
    <table border="1" cellpadding="5" cellspacing="0" style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr>
          <th>HS Code</th>
          <th>Product Code</th>
          <th>Product Name</th>
          <th>Quantity</th>
          <th>Rate</th>
          <th>Gross Amount</th>
          <th>Net Amount</th>
          <th>Mfg Date</th>
          <th>Exp Date</th>
        </tr>
      </thead>
      <tbody>
  `;

  this.rows.forEach(row => {
    printContents += `
      <tr>
        <td>${row.hsCode}</td>
        <td>${row.productCode}</td>
        <td>${row.productName}</td>
        <td>${row.quantity}</td>
        <td>${row.rate}</td>
        <td>${row.gAmt}</td>
        <td>${row.netAmt}</td>
        <td>${row.mfgDate}</td>
        <td>${row.expDate}</td>
      </tr>
    `;
  });

  printContents += `
      </tbody>
    </table>
  `;

  const popupWindow = window.open('', '_blank', 'width=800,height=600');
  if (popupWindow) {
    setTimeout(() => {
      popupWindow.document.open();
      popupWindow.document.write(`
        <html>
          <head>
            <title>Print Transaction Data</title>
            <style>
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid black; padding: 8px; text-align: left; }
              th { background-color: #f0f0f0; }
            </style>
          </head>
          <body onload="window.print(); window.onafterprint = () => window.close();">
            ${printContents}
          </body>
        </html>
      `);
      popupWindow.document.close();
    }, 100);
  } else {
    alert('Popup blocked. Please allow popups for this site.');
  }
}





confirmReceived() {
  this.showReceivedModal = false;
  alert('Marked as RECEIVED!');
  // Add your logic here, like API call or state update
}

cancelReceived() {
  this.showReceivedModal = false;
}


//adding vat and calculation  net amt
updateNetAmt(row: Row) {
  const qty = parseFloat(row.quantity) || 0;
  const rate = parseFloat(row.rate) || 0;

  row.gAmt = (qty * rate).toFixed(2);
  row.netAmt = (qty * rate * 1.13).toFixed(2);
}


showResetConfirm = false;

onResetClicked() {
  this.showResetConfirm = true;
}

confirmReset() {
  this.resetData();
  this.showResetConfirm = false;

  this.dialog.open(DialogBox, {
  width: '375px',
  position: { right: '0' },
  data: this.rows  // your Row[] data
});
}

cancelReset() {
  this.showResetConfirm = false;
}

focusLastProductName() {
  const lastInput = this.productNameInputs.last;
  if (lastInput) {
    lastInput.nativeElement.focus();
  }
}





openEditDialog() {
  const dialogRef = this.dialog.open(DialogView, {
    width: '700px',
    data: {} 
  });

//changing date in dd/mm/yyyy
function formatToDateInput(dateStr: string): string {
  if (!dateStr) return '';
  const [day, month, year] = dateStr.split('/');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

// added 1  year in expdate
function addOneYear(dateStr: string): string {
  if (!dateStr) return '';
  const [day, month, year] = dateStr.split('/');
  const dateObj = new Date(+year, +month - 1, +day);
  dateObj.setFullYear(dateObj.getFullYear() + 1);
  dateObj.setMonth(dateObj.getMonth() + 4); 

  const newYear = dateObj.getFullYear();
  const newMonth = String(dateObj.getMonth() + 1).padStart(2, '0');
  const newDay = String(dateObj.getDate()).padStart(2, '0');

  return `${newYear}-${newMonth}-${newDay}`; // yyyy-mm-dd 
}




 dialogRef.afterClosed().subscribe(selectedRow => {
    console.log('Dialog returned:', selectedRow);
  if (selectedRow) {
    const newRow = {
      hsCode: selectedRow.voucherno || '',        
      productCode: selectedRow.productcode || '',
      productName: selectedRow.supplier || '',
      upc: '12',        
      unit: '',
      quantity: selectedRow.quantity || '0',
      rate: selectedRow.rate || '0.00',
      gAmt: '0.00', 
      netAmt: '0.00',
       mfgDate: formatToDateInput(selectedRow.mfgdate) || '',
      expDate: addOneYear(selectedRow.mfgdate) || '',
    
    };

    if (this.rows.length === 1 && this.rows[0].hsCode === '') {
      this.rows[0] = newRow;
      this.updateNetAmt(this.rows[0]);  
    } else {
      this.rows.push(newRow);
   
    }
       this.updateNetAmt(this.rows[this.rows.length - 1]);  // Calculate new last row
      // **Added to update the form inputs:**
      this.supplierName = selectedRow.supplier || '';
      this.account = selectedRow.supplier || '';
      this.address = selectedRow.address || '';
      this.vatNo = selectedRow.vatNo || '';
     this.invoiceDate = formatToDateInput(selectedRow.mfgdate) || '';
       this.mfgDate = formatToDateInput(selectedRow.mfgdate) || '';
      this.expDate = formatToDateInput(selectedRow.mfgdate) || '';

      setTimeout(() => this.focusLastProductName(), 0);

  }
});
}


openViewDialogbtn() {
  const dialogRef = this.dialog.open(DialogView, {
    width: '700px',
    data: {} // pass if want,or empty
  });

  function formatToDateInput(dateStr: string): string {
  if (!dateStr) return '';
  const [day, month, year] = dateStr.split('/');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}
// add  1 year for exp
function addOneYear(dateStr: string): string {
  if (!dateStr) return '';
  const [day, month, year] = dateStr.split('/');
  const dateObj = new Date(+year, +month - 1, +day);
  dateObj.setFullYear(dateObj.getFullYear() + 1);
  dateObj.setMonth(dateObj.getMonth() + 4); 

  const newYear = dateObj.getFullYear();
  const newMonth = String(dateObj.getMonth() + 1).padStart(2, '0');
  const newDay = String(dateObj.getDate()).padStart(2, '0');

  return `${newYear}-${newMonth}-${newDay}`; // yyyy-mm-dd for <input type="date">
}



  dialogRef.afterClosed().subscribe(selectedRow => {
  if (selectedRow) {
    
    const newRow = {
      hsCode: selectedRow.voucherno || '',        
      productCode: selectedRow.productcode  || '',
      productName: selectedRow.supplier || '',
      upc: '12',        
      unit: '',
      quantity: selectedRow.quantity || '0',
      rate: selectedRow.rate || '0.00',
      gAmt: '0.00', 
      netAmt: '0.00',
       mfgDate: formatToDateInput(selectedRow.mfgdate) || '',
  expDate: addOneYear(selectedRow.mfgdate) || '',
    };

    if (this.rows.length === 1 && this.rows[0].hsCode === '') {
      this.rows[0] = newRow;
      this.updateNetAmt(this.rows[0]);  // Calculate right after setting
    } else {
      this.rows.push(newRow);
      this.updateNetAmt(this.rows[this.rows.length - 1]);  // Calculate new last row
    }
    this.invoiceNo = selectedRow.voucherno || '';
      this.updateNetAmt(this.rows[this.rows.length - 1]);  
      this.supplierName = selectedRow.supplier || '';
      this.address = selectedRow.address || '';
      this.vatNo = selectedRow.vatNo || '';
      this.remark = selectedRow.remark || '';
    this.invoiceDate = formatToDateInput(selectedRow.mfgdate) || '';

      this.mfgDate = formatToDateInput(selectedRow.mfgdate) || '';
      this.expDate = formatToDateInput(selectedRow.mfgdate) || '';
      setTimeout(() => this.focusLastProductName(), 0);
  }
});
}



//footer 
get totalQuantity(): number {
  return this.rows.reduce((sum, row) => sum + (parseFloat(row.quantity) || 0), 0);
}
get totalGross(): number {
  return this.rows.reduce((sum, row) => sum + (parseFloat(row.gAmt) || 0), 0);
}
//  taxable = totalGross
get totalTaxable(): number {
  return this.totalGross; 
}
// VAT amount 
get totalVAT(): number {
  return this.totalTaxable * 0.13;
}
// Net amount 
get totalNetAmount(): number {
  return this.totalTaxable + this.totalVAT;
}

}






