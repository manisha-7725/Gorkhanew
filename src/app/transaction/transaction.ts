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
      expDate: ''
    }
  ];

invoiceNo: string = '';
invoiceDate: string = '';
chequeNo1:string=''
chequeNo2:string=''
address: string = '';
vatNo: string = '';
remark: string = '';

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
      expDate: ''
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
  
    data: this.rows
  });

  dialogRef.afterClosed().subscribe((updatedRows :Row[]) => {
    if (updatedRows) {
      this.rows = updatedRows;
    }
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

onReceivedClick() {
  this.showReceivedModal = true;
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




openEditDialog() {
  const dialogRef = this.dialog.open(DialogView, {
    width: '700px',
    data: {} // or pass any data if needed
  });

 dialogRef.afterClosed().subscribe(selectedRow => {
  if (selectedRow) {
    const newRow = {
      hsCode: selectedRow.voucherno || '',        
      productCode: selectedRow.invoiceNo || '',
      productName: selectedRow.supplier || '',
      upc: '12',        
      unit: '',
      quantity: selectedRow.quantity || '0',
      rate: selectedRow.rate || '0.00',
      gAmt: '0.00', 
      netAmt: '0.00',
      mfgDate: selectedRow.mfgdate || '',
      expDate: selectedRow.mfgdate || '',
    };

    if (this.rows.length === 1 && this.rows[0].hsCode === '') {
      // Replace the default empty row
      this.rows[0] = newRow;
      this.updateNetAmt(this.rows[0]);  // Calculate right after setting
    } else {
      this.rows.push(newRow);
      this.updateNetAmt(this.rows[this.rows.length - 1]);  // Calculate new last row
    }
  }
});}


openViewDialogbtn() {
  const dialogRef = this.dialog.open(DialogView, {
    width: '700px',
    data: {} // pass if you want, else empty
  });

  dialogRef.afterClosed().subscribe(selectedRow => {
  if (selectedRow) {
    const newRow = {
      hsCode: selectedRow.voucherno || '',        
      productCode: selectedRow.invoiceNo || '',
      productName: selectedRow.supplier || '',
      upc: '12',        
      unit: '',
      quantity: selectedRow.quantity || '0',
      rate: selectedRow.rate || '0.00',
      gAmt: '0.00', 
      netAmt: '0.00',
      mfgDate: selectedRow.mfgdate || '',
      expDate: selectedRow.mfgdate || '',
    };

    if (this.rows.length === 1 && this.rows[0].hsCode === '') {
      // Replace the default empty row
      this.rows[0] = newRow;
      this.updateNetAmt(this.rows[0]);  // Calculate right after setting
    } else {
      this.rows.push(newRow);
      this.updateNetAmt(this.rows[this.rows.length - 1]);  // Calculate new last row
    }
  }
});
}




}






