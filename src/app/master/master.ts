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
  ],
  templateUrl: './master.html',
  styleUrl: './master.css',
})
export class Master {
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };
  
constructor(private router: Router) {}

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
    this.dataSource.data = [
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
  }

  // Tree child check
  hasChild = (_: number, node: any) => node.expandable;

  searchTerm = '';
  tableSearch = '';
  searchType: 'name' | 'code' = 'name';
  sortType: 'name' | 'mrp' = 'name';

  products: Product[] = [
    {
      productCode: '11',
      productName: 'Carlsberg 650ml Bottle (12x650)',
      upc: 12,
      dispatchRate: 4471.51,
      wsPrice: 4620.0,
      retailPrice: 4761.79,
      mrp: 5214.16,
    },
    {
      productCode: '12',
      productName: 'Tuborg 500ml (12x500)',
      upc: 12,
      dispatchRate: 3096.36,
      wsPrice: 3204.0,
      retailPrice: 3297.37,
      mrp: 3610.62,
    },
    {
      productCode: '13',
      productName: 'Gorkha 650ml (12x650)',
      upc: 12,
      dispatchRate: 3961.52,
      wsPrice: 4092.0,
      retailPrice: 4218.69,
      mrp: 4619.47,
    },
    {
      productCode: '14',
      productName: 'Carlsberg 650ml Bottle (12x650)',
      upc: 12,
      dispatchRate: 4471.51,
      wsPrice: 4620.0,
      retailPrice: 4761.79,
      mrp: 5214.16,
    },
    {
      productCode: '15',
      productName: 'Tuborg 500ml (12x500)',
      upc: 12,
      dispatchRate: 3096.36,
      wsPrice: 3204.0,
      retailPrice: 3297.37,
      mrp: 3610.62,
    },
    {
      productCode: '16',
      productName: 'Gorkha 650ml (12x650)',
      upc: 12,
      dispatchRate: 3961.52,
      wsPrice: 4092.0,
      retailPrice: 4218.69,
      mrp: 4619.47,
    },
    {
      productCode: '17',
      productName: 'Carlsberg 650ml Bottle (12x650)',
      upc: 12,
      dispatchRate: 4471.51,
      wsPrice: 4620.0,
      retailPrice: 4761.79,
      mrp: 5214.16,
    },
    {
      productCode: '18',
      productName: 'Tuborg 500ml (12x500)',
      upc: 12,
      dispatchRate: 3096.36,
      wsPrice: 3204.0,
      retailPrice: 3297.37,
      mrp: 3610.62,
    },
    {
      productCode: '19',
      productName: 'Gorkha 650ml (12x650)',
      upc: 12,
      dispatchRate: 3961.52,
      wsPrice: 4092.0,
      retailPrice: 4218.69,
      mrp: 4619.47,
    },
  ];

  get filteredProducts() {
    let result = this.products.filter((p) =>
      this.searchType === 'name'
        ? p.productName.toLowerCase().includes(this.searchTerm.toLowerCase())
        : p.productCode.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    if (this.sortType === 'name') {
      result.sort((a, b) => a.productName.localeCompare(b.productName));
    } else if (this.sortType === 'mrp') {
      result.sort((a, b) => b.mrp - a.mrp);
    }

    if (this.tableSearch) {
      result = result.filter((p) =>
        Object.values(p).some((val) =>
          val.toString().toLowerCase().includes(this.tableSearch.toLowerCase())
        )
      );
    }
    return result;
  }

  pageSize = 5; // Number of products per page
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
}