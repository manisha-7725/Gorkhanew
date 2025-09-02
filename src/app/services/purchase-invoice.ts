import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseInvoice {
  private apiUrl = 'http://localhost:3000/purchaseInvoices';

  constructor(private http: HttpClient) {}

  // Save new invoice
  addInvoice(invoice: any): Observable<any> {
    return this.http.post(this.apiUrl, invoice);
  }

  // // Get all invoices
  // getInvoices(): Observable<any[]> {
  //   return this.http.get<any[]>(this.apiUrl);
  // }

  // // Get by id
  // getInvoiceById(id: number): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/${id}`);
  // }

  // // Update
  // updateInvoice(id: number, invoice: any): Observable<any> {
  //   return this.http.put(`${this.apiUrl}/${id}`, invoice);
  // }

  // // Delete
  // deleteInvoice(id: number): Observable<any> {
  //   return this.http.delete(`${this.apiUrl}/${id}`);
  // }
}
