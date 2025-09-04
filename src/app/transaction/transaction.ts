declare var $: any; // jQuery
declare var NepaliFunctions: any; // comes with nepali.datepicker.js
import { CommonModule } from '@angular/common';
import {
  Component,
  AfterViewInit,
  ElementRef,
  QueryList,
  ViewChildren,

} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogBox } from '../dialog-box/dialog-box';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { DialogView } from '../dialog-view/dialog-view';
import { ProductDialog } from '../product-dialog/product-dialog';
import { MasterRepo } from '../master-repo';
import { OnInit } from '@angular/core';
import { NepalidatePicker } from '../nepalidate-picker/nepalidate-picker';
import { PurchaseInvoice } from '../services/purchase-invoice';
// import { FormBuilder,FormGroup } from '@angular/forms';

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
  editable?: boolean;
}

@Component({
  selector: 'app-transaction',
  imports: [CommonModule, FormsModule,NepalidatePicker],
  templateUrl: './transaction.html',
  styleUrls: ['./transaction.css'],
})
export class Transaction implements OnInit, AfterViewInit {
  @ViewChildren('hsCodeInput') hsCodeInputs!: QueryList<ElementRef>;
  @ViewChild('form1') form1!: NgForm;
  @ViewChild('form2') form2!: NgForm;
  @ViewChild('form3') form3!: NgForm;

  selectedPayment: string = '';
  showConfirm = false;
  account: string = '';
  productSelected: boolean = false;
 

  HideDetails: { [key: string]: boolean } = { F1: false }; // false = initially hidden
  visible = true; // if you also use visible for *ngIf
  

  onclick() {
    // Toggle the same property to show/hide
    this.HideDetails['F1'] = !this.HideDetails['F1'];
    this.visible = !this.visible;
  }

today = new Date().toISOString().split('T')[0]; 
 
  rows: Row[] = [
    {
      hsCode: '',
      productCode: '',
      productName: 'Press Enter to Select item',
      upc: '',
      unit: 'CASE',
      quantity: '0',
      rate: '0.00',
      gAmt: '0.00',
      netAmt: '0.00',
      mfgDate: '',
      expDate: '',
    },
  ];

  invoiceNo: string = '';
  invoiceDate: string = '';
  chequeNo1: string = '';
  chequeNo2: string = '';
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
        quantity: '0',
        rate: '0.00',
        gAmt: '0.00',
        netAmt: '0.00',
        mfgDate: '',
        expDate: '',
      },
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
    //  hold user input
  }

  indexToDelete: number | null = null;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private masterRepo: MasterRepo,
    private invoiceService: PurchaseInvoice,
 
  ) {
  
}

 autoSaveTemplate() {
    const invoiceJSON = {
      form1: {
        invoiceNo: this.invoiceNo,
        invoiceDateAD: this.invoiceDate,
        invoiceDateBS: this.mfgNepaliDate
      },
      form2: {
        paymentTerms: this.selectedPayment,
        account: this.account,
        chequeDetails: {
          chequeNo: this.chequeNo1,
          chequeDate: this.chequeNo2
        },
        godown: "Main Warehouse"
      },
      form3: {
        supplierName: this.supplierName,
        address: this.address,
        vatNo: this.vatNo,
        remark: this.remark
      },
      products: this.rows,
      footerTotals: {
        totalQuantity: this.totalQuantity,
        totalGross: this.totalGross,
        totalTaxable: this.totalTaxable,
        totalVAT: this.totalVAT,
        totalNetAmount: this.totalNetAmount
      }
    };


    this.invoiceService.addInvoice(invoiceJSON).subscribe(res => {
    console.log('Data saved in db.json:', res);
  });

  //  this.invoiceService.updateInvoice(1, invoiceJSON).subscribe(res => {
  //   console.log("Auto-saved (template-driven):", res);
  // });
  }

  rowss: any[] = [];
  nepaliInput: any; 
  showDialog: boolean = false;
  mfgNepaliDate: string = '';
  dialogRows: Row[] = [];
  selectedRow: Row | null = null;
  dialogRef: any;
  selectedName: string = '';
  searchtext: string = '';
  currentRowIndex: number = 0;
  isDisabled = true;
  showReceivedModal = false;
  showNoDataDialog = false;

  msg = ' ⚠️ Information !!!';
  alertMessage = 'Supplier can not be null';

  setSelectedRow(row: any) {
    this.selectedRow = row;
  }

  openViewDialog(row: any) {
    this.dialog.open(DialogView, {
      width: '800px',
      position: { right: '0' },
      data: row,
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

  showRowInDialog(row: any) {
    this.selectedRow = { ...row }; // create a copy to edit
    this.showDialog = true;
    const dialogRef = this.dialog.open(DialogBox, {
      data: [...this.rows],
    });
  }






  // saveInvoice() {
  //   const invoiceJSON = this.makeInvoiceJSON();

  // console.log('✅ Saving Invoice:', invoiceJSON);
 
  //   this.envService.addInvoice(invoiceJSON).subscribe({
  //     next: (res) => console.log(' Saved to db.json', res),
  //     error: (err) => console.error(' Error saving invoice', err)
  //   });
  // }


todayNepaliDate(date: Date): string {
  // Replace with your AD→BS conversion logic
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


  ngOnInit(): void {
    const dialogRef = this.dialog.open(DialogBox, {
      width: '375px',
      position: { right: '0' },
      disableClose: true,
      data: this.rows,
    });
// Initialize invoiceJSON


   dialogRef.afterClosed().subscribe((result) => {
  if (result) {
    // Supplier info
    this.supplierName = result.name || '';
    this.account = result.name || '';
    this.address = result.address || '';
    this.vatNo = result.vatNo || '';
    this.invoiceDate = result.invoiceDate || this.invoiceDate;
    this.remark = '';

    // Product row if selected
    if (result.selectedRow) {
      const selected = result.selectedRow;
      this.rows[0] = {
        hsCode: selected.itemcode || '',
        productCode: selected.productcode || '',
        productName: selected.description || '',
        upc: '12',
        unit: '',
        quantity: '0',
        rate: '0',
        gAmt: '0.00',
        netAmt: '0.00',
        mfgDate: '',
        expDate: '',
      };
    }

    // Set current date
    const today = new Date();
    this.invoiceDate = today.toISOString().split('T')[0];
    const nepaliObj = NepaliFunctions.AD2BS({
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate(),
    });
    this.mfgNepaliDate = `${nepaliObj.month.toString().padStart(2, '0')}/${nepaliObj.day.toString().padStart(2, '0')}/${nepaliObj.year}`;
  }

  
});
  }






ngAfterViewInit() {
    this.focusLastHSCode();
  }

  goBack() {
    this.router.navigate(['/master']);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogBox, {
      width: '100%',
      position: { right: '0' },
      data: {
        dialogRows: this.rows,
        selectedRow: this.selectedRow,
      },
    });

     dialogRef.afterClosed().subscribe((result) => {
      if (result?.selectedRow) {
      const index = this.rows.findIndex(
        (r) => r.productCode === result.selectedRow.productCode
      );
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

  onRowDoubleClick(row: Row) {
    this.dialogRef.close({ selectedRow: row });
  }


  

  get filteredDialogRows() {
    if (!this.searchtext || this.searchtext.trim() === '')
      return this.dialogRows;
    const search = this.searchtext.toLowerCase();
    return this.dialogRows.filter(
      (row) =>
        row.productName.toLowerCase().includes(search) ||
        row.productCode.toLowerCase().includes(search) ||
        row.hsCode.toLowerCase().includes(search) ||
        row.mfgDate.toLowerCase().includes(search)
    );
  }

  addRow() {
    this.rows.forEach((r) => (r.editable = false));
    this.rows.push({
      hsCode: '',
      productCode: '',
      productName: '',
      upc: '',
      unit: '',
      quantity: '0',
      rate: '0',
      gAmt: '0.00',
      netAmt: '0.00',
      mfgDate: '',
      expDate: '',
    });
    setTimeout(() => {
      const lastInput = this.productNameInputs.last;
      lastInput?.nativeElement.focus();
    }, 0);
  }

  //product-dialog
  openProductDialog(rowIndex: number) {
    this.currentRowIndex = rowIndex;
    const dialogRef = this.dialog.open(ProductDialog, {
      width: '600px',
      position: { right: '0' },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.selectedRow) {
        const selected = result.selectedRow;

        // Fill the currently selected row
        this.rows[this.currentRowIndex] = {
          ...this.rows[this.currentRowIndex], 
          productCode: selected.itemcode || '',
          productName: selected.description || '',
          upc: this.rows[this.currentRowIndex].upc || '12',
          unit: this.rows[this.currentRowIndex].unit || 'CASE',
          rate: selected.rate || '',
        };

        // Replace or push row
        if (this.rows.length === 1 && !this.rows[0].productCode) {
          this.rows[0] = {
            hsCode: '',
            productCode: selected.itemcode || '',
            productName: selected.description || '',
            upc: '12',
            unit: 'CASE', // default
            quantity: '0',
            rate: selected.rate || '',
            gAmt: '0.00',
            netAmt: '0.00',
            mfgDate: '',
            expDate: '',
          };
        }
        // Auto-calculate Expiry Date if MFG date is already set
        if (this.rows[this.currentRowIndex].mfgDate) {
          this.rows[this.currentRowIndex].expDate = this.calculateExpDate(
            this.rows[this.currentRowIndex].mfgDate
          );
        }
        // Focus Quantity after Product Name
        setTimeout(
          () => this.focusNextInput(this.currentRowIndex, 'productName'),
          0
        );
      }
    });
  }

  calculateExpDate(mfgDateStr: string): string {
    const dateObj = new Date(mfgDateStr);
    dateObj.setFullYear(dateObj.getFullYear() + 1);
    dateObj.setMonth(dateObj.getMonth() + 4);
    return dateObj.toISOString().split('T')[0]; // returns yyyy-MM-dd
  }

  onMfgDateChange(row: Row) {
    if (row.mfgDate) {
      row.expDate = this.calculateExpDate(row.mfgDate);
    }
  }

  @ViewChildren('productNameInput') productNameInputs!: QueryList<ElementRef>;
  @ViewChildren('quantityInput') quantityInputs!: QueryList<ElementRef>;
  @ViewChildren('rateInput') rateInputs!: QueryList<ElementRef>;
  @ViewChildren('mfgDateInput') mfgDateInputs!: QueryList<ElementRef>;
  @ViewChildren('expDateInput') expDateInputs!: QueryList<ElementRef>;

  focusNextInput(
    rowIndex: number,
    field: 'productName' | 'quantity' | 'mfgDate'
  ) {
    setTimeout(() => {
      switch (field) {
        case 'productName':
          this.quantityInputs.toArray()[rowIndex]?.nativeElement.focus();
          break;
        case 'quantity':
          this.mfgDateInputs.toArray()[rowIndex]?.nativeElement.focus();
          break;
        case 'mfgDate':
          if (rowIndex === this.rows.length - 1) {
            // Add new row first
            this.addRow();

            // Focus the **last productName input**, not using rowIndex
            setTimeout(() => {
              const lastInput = this.productNameInputs.toArray().pop();
              lastInput?.nativeElement.focus();
            }, 0);
          } else {
            this.productNameInputs
              .toArray()
              [rowIndex + 1]?.nativeElement.focus();
          }
          break;
      }
    }, 0);
  }

  focusLastHSCode() {
    const lastInput = this.hsCodeInputs.last;
    if (lastInput) {
      lastInput.nativeElement.focus();
    }
  }

firstRowBackup = this.rows[0]; // store first row



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
    this.rows.splice(index, 1)[0];
    if (index === 0) {
    this.rows.unshift(this.firstRowBackup);
  }
  }

  closeAlert() {
    this.showNoDataDialog = false;
  }

  onReceivedClick() {
    if (
      this.rows &&
      this.rows.length > 0 &&
      this.rows.some((row) => row.productCode && row.productName)
    ) {
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

    this.rows.forEach((row) => {
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
    const qtyNum = Number(row.quantity) || 0;
    const rateNum = Number(row.rate) || 0;
    row.gAmt = (qtyNum * rateNum).toFixed(2);
    row.netAmt = (qtyNum * rateNum * 1.13).toFixed(2);
  }

  //reset
  showResetConfirm = false;
  onResetClicked() {
    this.showResetConfirm = true;
  }
  confirmReset() {
    this.resetData();
    this.showResetConfirm = false;

    const dialogRef = this.dialog.open(DialogBox, {
      width: '375px',
      position: { right: '0' },
      data: this.rows, // your Row[] data
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (!result) return; // user closed dialog without selection

      // --- Supplier Selection ---
      if ('name' in result) {
        this.supplierName = result.name || '';
        this.account = result.name || '';
        this.address = result.address || '';
        this.vatNo = result.vatNo || '';
      }

      // --- Product Selection ---
      else if ('productName' in result) {
        const rowIndex = this.selectedRowIndex ?? 0;

        this.rows[rowIndex] = {
          ...this.rows[rowIndex],
          productCode: result.productCode || '',
          productName: result.productName || '',
          rate: result.rate || '',
          hsCode: result.hsCode || '',
          upc: result.upc || '',
          mfgDate: result.mfgDate || '',
          expDate: result.expDate || '',
        };

        this.focusNextInput(rowIndex, 'productName');
      }
    });
  }
  //reset end

  cancelReset() {
    this.showResetConfirm = false;
  }
  focusLastProductName() {
    const lastInput = this.productNameInputs.last;
    if (lastInput) {
      lastInput.nativeElement.focus();
    }
  }

  selectedRowIndex: number | null = null;
  selectRow(index: number) {
    this.selectedRowIndex = index;
  }

  openEditDialog() {
    const dialogRef = this.dialog.open(DialogView, {
      width: '700px',
      position: { right: '0' },
      data: {},
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

    dialogRef.afterClosed().subscribe((selectedRow) => {
      console.log('Dialog returned:', selectedRow);
      if (selectedRow) {
        const newRow = {
          hsCode: selectedRow.voucherno || '',
          productCode: selectedRow.productcode || '',
          productName: selectedRow.supplier || '',
          upc: '12',
          unit: '',
          quantity: selectedRow.quantity || '0',
          rate: selectedRow.rate || '0',
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
        this.updateNetAmt(this.rows[this.rows.length - 1]); // Calculate new last row

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
      position: { right: '0' },
      data: {}, // pass if want,or empty
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

    dialogRef.afterClosed().subscribe((selectedRow) => {
      if (selectedRow) {
        const newRow = {
          hsCode: selectedRow.voucherno || '',
          productCode: selectedRow.productcode || '',
          productName: selectedRow.supplier || '',
          upc: '12',
          unit: '',
          quantity: selectedRow.quantity || 0,
          rate: selectedRow.rate || '0',
          gAmt: '0.00',
          netAmt: '0.00',
          mfgDate: formatToDateInput(selectedRow.mfgdate) || '',
          expDate: addOneYear(selectedRow.mfgdate) || '',
        };

        if (this.rows.length === 1 && this.rows[0].hsCode === '') {
          this.rows[0] = newRow;
          this.updateNetAmt(this.rows[0]); // Calculate right after setting
        } else {
          this.rows.push(newRow);
          this.updateNetAmt(this.rows[this.rows.length - 1]); // Calculate new last row
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
    return this.rows.reduce((sum, row) => sum + (Number(row.quantity) || 0), 0);
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
    return Number((this.totalTaxable * 0.13).toFixed(2));
  }
  // Net amount
  get totalNetAmount(): number {
    return this.totalTaxable + this.totalVAT;
  }
}
