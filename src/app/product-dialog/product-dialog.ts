import { Component, OnInit ,ViewChildren, QueryList, ElementRef, ViewChild } from '@angular/core';
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
@ViewChild('searchInput') searchInput!: ElementRef;


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
        rate: '200',
        upc:'12',
      },
      {
        description: 'Beer 4',
        itemcode: '2083',
        stock: '7512',
        stockCase: '625',
        groupname: 'PRODUCT LIST',
        stockeach: '11',
        rate: '210',
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

  // Filter 
  this.filterProducts = this.products.filter((product) =>
    product.description.toLowerCase().includes(searchText)||
    product.itemcode.toLowerCase().includes(searchText)||
    product.stock.toLowerCase().includes(searchText)||
    product.stockCase.toLowerCase().includes(searchText)||
    product.stockeach.toLowerCase().includes(searchText)||
    product.groupname.toLowerCase().includes(searchText)
  );

  // Update pagination 
   this.currentPage = 1; 
  this.totalPages = Math.ceil(this.filterProducts.length / this.pageSize);
  this.updatePaginatedProducts(true);

  
  setTimeout(() => this.searchInput.nativeElement.focus(), 0);
}

updatePaginatedProducts(resetFocus: boolean = false) {
  const start = (this.currentPage - 1) * this.pageSize;
  const end = start + this.pageSize;
  this.paginatedProducts = this.filterProducts.slice(start, end);

  if (resetFocus && this.rows) {
    setTimeout(() => {
      this.currentRowIndex = 0; // always start at first row
      const rowArray = this.rows.toArray();
      if (rowArray[0]) {
        rowArray[0].nativeElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      
      }
    });
  }
}

onPageChange(newPage: number) {
  this.currentPage = newPage;
  this.updatePaginatedProducts(true); // scroll to first row
}

selectProduct(product: any, index: number) {
  this.currentRowIndex = index;   
  this.dialogRef.close({ selectedRow: product });
}


ngAfterViewInit() {
  this.rows.changes.subscribe(() => {
    if (this.rows && this.rows.length > 0) {
      this.currentRowIndex = 0;
      this.scrollToRow(this.currentRowIndex);
    }
  });

  // focus the first row 
  setTimeout(() => {
    if (this.rows && this.rows.length > 0) {
      this.currentRowIndex = 0;
      this.scrollToRow(this.currentRowIndex);
    }
  });
}



onKeyDown(event: KeyboardEvent) {
  if (!this.paginatedProducts || this.paginatedProducts.length === 0) return;

  if (event.key === 'ArrowDown') {

    if (this.currentRowIndex < this.paginatedProducts.length - 1) {
      this.currentRowIndex++;
      this.scrollToRow(this.currentRowIndex);
    }
    event.preventDefault();
  } else if (event.key === 'ArrowUp') {
   
    if (this.currentRowIndex > 0) {
      this.currentRowIndex--;
      this.scrollToRow(this.currentRowIndex);
    }
    event.preventDefault();
  } else if (event.key === 'Enter') {
   
    const selectedProduct = this.paginatedProducts[this.currentRowIndex];
    if (selectedProduct) {
      this.selectProduct(selectedProduct, this.currentRowIndex);
    }
  }
}

scrollToRow(index: number) {
  const rowArray = this.rows.toArray();
  if (rowArray[index]) {
    rowArray[index].nativeElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
     rowArray[index].nativeElement.focus(); 
  }
}




}