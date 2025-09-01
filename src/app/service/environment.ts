import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Environment {
  private apiUrl = 'http://localhost:3000/invoices';

constructor(private http: HttpClient) {}


addInvoice(invoice: any): Observable<any> {
  return this.http.post(this.apiUrl, invoice);
}
getInvoices(): Observable<any> {
  return this.http.get(this.apiUrl);
}

//  GET by ID
getInvoiceById(id: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/${id}`);
}

  //  PUT (update)
  updateInvoice(id: number, invoiceData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, invoiceData);
  }

  //  DELETE
  deleteInvoice(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


}