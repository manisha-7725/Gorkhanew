import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionData {
  private transactionRows: any[] = [];

  setTransaction(rows: any[]) {
    this.transactionRows = [...rows]; // store a copy
  }

  getTransaction(): any[] {
    return [...this.transactionRows]; // return a copy
  }

  clearTransaction() {
    this.transactionRows = [];
  }
  
}
