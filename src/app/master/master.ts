import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { MatTreeModule } from '@angular/material/tree';
import { FilterPipe } from '../filter-pipe';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ExportMasterDialog } from '../export-master-dialog/export-master-dialog';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


interface FoodNode {
  name: string;
  children?: FoodNode[];
}
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
interface MenuItem {
  icon: string;
  label: string;
  route: string;
}
interface Product {
  productCode: string;
  productName: string;
  upc: number;
  dispatchRate: number;
  wsPrice: number;
  retailPrice: number;
  mrp: number;
}

@Component({
  selector: 'app-master',
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatTreeModule,
    FilterPipe,
    FormsModule,
   
  ],
  templateUrl: './master.html',
  styleUrl: './master.css',
 
})
export class Master {
 searchTerm = '';
  tableSearch = '';
  searchType: 'name' | 'code' = 'name';
  sortType: 'name' | 'mrp' = 'name';
searchtext: string = '';
  searchItemGroup = '';
  originalData: FoodNode[] = [];
  




  openExportDialog(): void {
    this.dialog.open(ExportMasterDialog, { width: '400px' });
  }


  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };
  selectedCategory: string = ''; 
  constructor(private router: Router,private dialog: MatDialog ) {}




  onView(): void {
    this.router.navigate(['/views']);
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  ngOnInit() {
    this.originalData  = [
      {
        name: 'PRODUCT LISTS',
        children: [
          { name: 'Alcohalic' },
          { name: 'CG PRODUCTS' },
          {
            name: 'Coke',
            children: [
              {
                name: 'half',
                children: [{ name: 'vodka' }],
              },
            ],
          },
          { name: 'Juice' },
          { name: 'Noodles' },
          { name: 'test' },
        ],
      },
    ];

      this.dataSource.data = this.originalData;
  }

  hasChild = (_: number, node: any) => node.expandable;

 
  products: Product[] = [
    {
      productCode: '10CBG650B0',
      productName: 'Carlsberg 650ml Bottle (12x650)',
      upc: 12,
      dispatchRate: 4471.51,
      wsPrice: 4620.0,
      retailPrice: 4761.79,
      mrp: 5214.16,
    },
    {
      productCode: '10TBG500C0',
      productName: 'Tuborg 500ml (12x500)',
      upc: 12,
      dispatchRate: 3096.36,
      wsPrice: 3204.0,
      retailPrice: 3297.37,
      mrp: 3610.62,
    },
    {
      productCode: '10GRK650B0',
      productName: 'Coke',
      upc: 12,
      dispatchRate: 3961.52,
      wsPrice: 4092.0,
      retailPrice: 4218.69,
      mrp: 4619.47,
    },
    {
      productCode: '10CBG650B0',
      productName: 'Carlsberg 650ml Bottle (12x650)',
      upc: 12,
      dispatchRate: 4471.51,
      wsPrice: 4620.0,
      retailPrice: 4761.79,
      mrp: 5214.16,
    },
    {
      productCode: '10TBG500C0',
      productName: 'Tuborg 500ml (12x500)',
      upc: 12,
      dispatchRate: 3096.36,
      wsPrice: 3204.0,
      retailPrice: 3297.37,
      mrp: 3610.62,
    },
    {
      productCode: '10GRK650B0',
      productName: 'Alcohalic apple',
      upc: 12,
      dispatchRate: 3961.52,
      wsPrice: 4092.0,
      retailPrice: 4218.69,
      mrp: 4619.47,
    },
    {
      productCode: '10CBG650B0',
      productName: 'Alcohalic 650ml Bottle (12x650)',
      upc: 12,
      dispatchRate: 4471.51,
      wsPrice: 4620.0,
      retailPrice: 4761.79,
      mrp: 5214.16,
    },
    {
      productCode: '10TBG500C0',
      productName: 'Juice 500ml (12x500)',
      upc: 12,
      dispatchRate: 3096.36,
      wsPrice: 3204.0,
      retailPrice: 3297.37,
      mrp: 3610.62,
    },
    {
      productCode: '10GRK650B0',
      productName: 'test 650ml (12x650)',
      upc: 12,
      dispatchRate: 3961.52,
      wsPrice: 4092.0,
      retailPrice: 4218.69,
      mrp: 4619.47,
    },
    {
      productCode: '10GRK650B0',
      productName: 'coke',
      upc: 12,
      dispatchRate: 3961.52,
      wsPrice: 4092.0,
      retailPrice: 4218.69,
      mrp: 4619.47,
    },
    {
      productCode: '10GRK650B0',
      productName: 'Noodles 650ml (12x650)',
      upc: 12,
      dispatchRate: 3961.52,
      wsPrice: 4092.0,
      retailPrice: 4218.69,
      mrp: 4619.47,
    },
    {
      productCode: '10GRK650B0',
      productName: 'CG products 650ml (12x650)',
      upc: 12,
      dispatchRate: 3961.52,
      wsPrice: 4092.0,
      retailPrice: 4218.69,
      mrp: 4619.47,
    },
    {
      productCode: '10GRK650B0',
      productName: 'Gorkha 650ml (12x650)',
      upc: 12,
      dispatchRate: 3961.52,
      wsPrice: 4092.0,
      retailPrice: 4218.69,
      mrp: 4619.47,
    },
    {
      productCode: '10GRK650B0',
      productName: 'Gorkha 650ml (12x650)',
      upc: 12,
      dispatchRate: 3961.52,
      wsPrice: 4092.0,
      retailPrice: 4218.69,
      mrp: 4619.47,
    },
  ];

  onCategorySelect(category: string) {
    if (
      category.toLowerCase() === 'product list' ||
      category.toLowerCase() === 'product lists'
    ) {
      this.selectedCategory = ''; 
    } else {
      this.selectedCategory = category.toLowerCase(); // filter by name 
    }
    this.currentPage = 1; 
  }
  get filteredProducts() {
    let result = this.products;

  
    if (this.selectedCategory) {
      result = result.filter((p) =>
        p.productName.toLowerCase().includes(this.selectedCategory)
      );
    }

    // Apply name/code search
    if (this.searchTerm) {
      result = result.filter((p) =>
        this.searchType === 'name'
          ? p.productName.toLowerCase().includes(this.searchTerm.toLowerCase())
          : p.productCode.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.sortType === 'name') {
      result.sort((a, b) => a.productName.localeCompare(b.productName));
    } else if (this.sortType === 'mrp') {
      result.sort((a, b) => b.mrp - a.mrp);
    }

    // Table-wide search
    if (this.tableSearch) {
      result = result.filter((p) =>
        Object.values(p).some((val) =>
          val.toString().toLowerCase().includes(this.tableSearch.toLowerCase())
        )
      );
    }

    return result;
  }

  pageSize = 5;
  currentPage = 1;

  get totalPages(): number {
    return Math.ceil(this.filteredProducts.length / this.pageSize);
  }

  get paginatedProducts() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredProducts.slice(start, end);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }




onSearchChange(searchValue: string) {
  if (!searchValue) {
    // Reset to original full tree if search is empty
    this.dataSource.data = this.originalData;
    return;
  }

  const filtered = this.filterTree(this.originalData, searchValue.toLowerCase());
  this.dataSource.data = filtered;
}

// Recursive function to filter the tree
filterTree(nodes: any[], searchText: string): any[] {
  return nodes
    .map(node => {
      if (node.name.toLowerCase().includes(searchText)) {
        return node; // Keep matching node (with children)
      }

      if (node.children) {
        const filteredChildren = this.filterTree(node.children, searchText);
        if (filteredChildren.length > 0) {
          return { ...node, children: filteredChildren }; 
          // Keep parent if children match
        }
      }
      return null;
    })
    .filter(node => node !== null) as any[];
}





 exportProductToExcel() {
    const productData = [
      { Code: 'PRD001', Name: 'Product A', Category: 'Cat1', Price: 150 },
      { Code: 'PRD002', Name: 'Product B', Category: 'Cat2', Price: 250 },
    ];

    const worksheet = XLSX.utils.json_to_sheet(productData);
    const workbook = {
      Sheets: { ProductList: worksheet },
      SheetNames: ['ProductList'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const data: Blob = new Blob([excelBuffer], {
      type: 'application/octet-stream',
    });
    saveAs(data, 'ProductExport.xlsx');
  }



}


