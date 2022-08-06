import { Component, OnInit, Input } from '@angular/core';
import { RouterModule, Routes, Router, RouterState } from '@angular/router';
import { ProductService } from '../../services/product.service';

export interface PeriodicElement {
  id: number;
  name: string;
  position: number;
  abbreviation: string;
}

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent implements OnInit {
  @Input() products: any;
  displayedColumns: string[] = ['id', 'name', 'category', 'type', 'price'];
  dataSource: PeriodicElement[] = [
    {id: 1, position: 1, name: 'Product 1 Name', abbreviation: 'C1'},
    {id: 2, position: 2, name: 'Product 2 Name', abbreviation: 'C1'},
    {id: 3, position: 3, name: 'Product 3 Name', abbreviation: 'C1'},
    {id: 4, position: 4, name: 'Product 4 Name', abbreviation: 'C1'},
    {id: 5, position: 5, name: 'Product 5 Name', abbreviation: 'C1'},
    {id: 6, position: 6, name: 'Product 6 Name', abbreviation: 'C1'},
    {id: 7, position: 7, name: 'Product 7 Name', abbreviation: 'C1'},
    {id: 8, position: 8, name: 'Product 8 Name', abbreviation: 'C1'},
    {id: 9, position: 9, name: 'Product 9 Name', abbreviation: 'C1'},
    {id: 10, position: 10, name: 'Product 10 Name', abbreviation: 'C1'},
  ];
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(): void {
    this.productService.getAll().subscribe((data: any)=>{
      this.dataSource = data;
      console.log(data)
    })
  }

  displayCreateProduct(): void {
    this.router.navigateByUrl('/admin-dashboard/create-product');

  }
  displayEdit(item: any): void {
    this.router.navigateByUrl('/admin-dashboard/edit-product/'+item.id);
  }

  delete(product: any): void {
    console.log(product);
    this.productService.delete(product).subscribe((data: any)=>{
      this.getProducts()
    })
  }
}
