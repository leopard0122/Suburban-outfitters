import { Component, OnInit, Input} from '@angular/core';
import { RouterModule, Routes, Router, RouterState } from '@angular/router';
import { SupplierService } from "../../services/supplier.service";
import { ISupplier } from "../../models/supplier.model";

export interface PeriodicElement {
  id: number;
  name: string;
  position: number;
  phone: string;
  abbreviation: string;
}

@Component({
  selector: 'app-manage-suppliers',
  templateUrl: './manage-suppliers.component.html',
  styleUrls: ['./manage-suppliers.component.scss']
})
export class ManageSuppliersComponent implements OnInit {
  @Input() suppliers: any;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: PeriodicElement[] = [
    { id: 1, position: 1, name: 'Supplier Name', phone: "1-801-456-789", abbreviation: 'C1'},
    { id: 2, position: 2, name: 'Supplier Name', phone: "1-801-456-789", abbreviation: 'C1'},
    { id: 3, position: 3, name: 'Supplier Name', phone: "1-801-456-789", abbreviation: 'C1'},
    { id: 4, position: 4, name: 'Supplier Name', phone: "1-801-456-789", abbreviation: 'C1'},
    { id: 5, position: 5, name: 'Supplier Name', phone: "1-801-456-789", abbreviation: 'C1'},
    { id: 6, position: 6, name: 'Supplier Name', phone: "1-801-456-789", abbreviation: 'C1'},
    { id: 7, position: 7, name: 'Supplier Name', phone: "1-801-456-789", abbreviation: 'C1'},
    { id: 8, position: 8, name: 'Supplier Name', phone: "1-801-456-789", abbreviation: 'C1'},
    { id: 9, position: 9, name: 'Supplier Name', phone: "1-801-456-789", abbreviation: 'C1'},
    { id: 10, position: 10, name: 'Supplier Name', phone: "1-801-456-789", abbreviation: 'C1'},
  ];
  constructor(private supplierService: SupplierService, private router: Router) { }

  ngOnInit(): void {
    this.getSuppliers()
  }

  getSuppliers(): void {
    this.supplierService.getAll().subscribe((data: any)=>{
      this.dataSource = data;
    })
  }

  displayCreateSupplier(): void {
    this.router.navigateByUrl('/admin-dashboard/create-supplier');
  }
  displayEdit(item: any): void {
    this.router.navigateByUrl('/admin-dashboard/edit-supplier/'+item.id);
  }
  delete(supplier: any): void {
    this.supplierService.delete(supplier).subscribe((data: any)=>{
      this.getSuppliers()
    })
  }
}
