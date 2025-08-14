import { Component, OnInit ,ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Pagination } from '../pagination/pagination';

@Component({
  selector: 'app-product-dialog',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    Pagination,
  ],
  templateUrl: './product-dialog.html',
  styleUrls: ['./product-dialog.css'],
})
export class ProductDialog implements OnInit {
  constructor(public dialogRef: MatDialogRef<ProductDialog>) {}
  @ViewChildren('productRow') rows!: QueryList<ElementRef>;
currentRowIndex: number = 0;


  selectProduct(product: any) {
    this.dialogRef.close({ selectedRow: product });
  }

  // Pagination variables
  products: any[] = []; 
 filterProducts: any[] = []; 
  paginatedProducts: any[] = []; 
  currentPage: number = 1;
  pageSize: number = 3;
  totalPages: number = 1;

  ngOnInit() {
    // Load products 
    this.products = [
      {
        description: 'Beer',
        itemcode: '2082',
        stock: '',
        stockCase: '',
        groupname: 'PRODUCT LIST',
        stockeach: '',
        rate: '2000',
        upc:'12',
      },
      {
        description: 'Beer 4',
        itemcode: '2083',
        stock: '7512',
        stockCase: '625',
        groupname: 'PRODUCT LIST',
        stockeach: '11',
        rate: '2100',
           upc:'12',
      },
      {
        description: 'Carlsberg 500mlCan',
        itemcode: '2084',
        stock: '7512',
        stockCase: '625',
        groupname: 'PRODUCT LIST',
        stockeach: '11',
        rate: '2200',
         upc:'12',

      },
      {
        description: 'Gorkha 330ml Bottle',
        itemcode: '2085',
        stock: '7512',
        stockCase: '625',
        groupname: 'PRODUCT LIST',
        stockeach: '11',
        rate: '2300',
         upc:'12',
      },
      {
        description: 'Beer',
        itemcode: '2086',
        stock: '7512',
        stockCase: '625',
        groupname: 'PRODUCT LIST',
        stockeach: '11',
        rate: '2400',
         upc:'12',
      },
      {
        description: 'Beer',
        itemcode: '2087',
        stock: '7512',
        stockCase: '625',
        groupname: 'PRODUCT LIST',
        stockeach: '11',
        rate: '2500',
         upc:'12',
      },
      {
        description: 'Beer',
        itemcode: '2088',
        stock: '7512',
        stockCase: '625',
        groupname: 'PRODUCT LIST',
        stockeach: '11',
        rate: '2600',
         upc:'12',
      },
      {
        description: 'Beer',
        itemcode: '2089',
        stock: '7512',
        stockCase: '625',
        groupname: 'PRODUCT LIST',
        stockeach: '11',
        rate: '2700',
        upc:'12',
      },
    ];



  this.filterProducts = [...this.products]; // initially all products
  this.totalPages = Math.ceil(this.filterProducts.length / this.pageSize);
  this.updatePaginatedProducts();
  }
searchProduct($event: Event) {
  const input = $event.target as HTMLInputElement;
  const searchText = input.value.toLowerCase();

  // Filter from the full list
  this.filterProducts = this.products.filter((product) =>
    product.description.toLowerCase().includes(searchText)
  );

  // Update pagination based on filtered results
  this.totalPages = Math.ceil(this.filterProducts.length / this.pageSize);
  this.currentPage = 1; // reset to first page
  this.updatePaginatedProducts();
}

updatePaginatedProducts() {
  const start = (this.currentPage - 1) * this.pageSize;
  const end = start + this.pageSize;
  this.paginatedProducts = this.filterProducts.slice(start, end);
}



  onPageChange(page: number) {
  this.currentPage = page;
  this.updatePaginatedProducts();
}

  
}