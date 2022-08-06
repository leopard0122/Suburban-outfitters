import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { RouterModule, Routes, Router, RouterState } from '@angular/router';
import { Location } from '@angular/common';
import { MatTable } from '@angular/material/table';
import { CustomerService } from '../../services/customer.service';

export interface PeriodicElement {
  id: number;
  title: string;
  position: number;
  phone: string;
  address: string;
}

@Component({
  selector: 'app-manage-customers',
  templateUrl: './manage-customers.component.html',
  styleUrls: ['./manage-customers.component.scss']
})
export class ManageCustomersComponent implements OnInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  @Input() customers: any;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: PeriodicElement[] = [
    {id: 1, position: 1, title: 'Customer Name', phone: "1-801-456-789", address: 'C1'},
    {id: 2, position: 2, title: 'Customer Name', phone: "1-801-456-789", address: 'C1'},
    {id: 3, position: 3, title: 'Customer Name', phone: "1-801-456-789", address: 'C1'},
    {id: 4, position: 4, title: 'Customer Name', phone: "1-801-456-789", address: 'C1'},
    {id: 5, position: 5, title: 'Customer Name', phone: "1-801-456-789", address: 'C1'},
    {id: 6, position: 6, title: 'Customer Name', phone: "1-801-456-789", address: 'C1'},
    {id: 7, position: 7, title: 'Customer Name', phone: "1-801-456-789", address: 'C1'},
    {id: 8, position: 8, title: 'Customer Name', phone: "1-801-456-789", address: 'C1'},
    {id: 9, position: 9, title: 'Customer Name', phone: "1-801-456-789", address: 'C1'},
    {id: 10, position: 10, title: 'Customer Name', phone: "1-801-456-789", address: 'C1'},
  ];
  constructor(private customerService: CustomerService, private location: Location, private router: Router) { }

  ngOnInit(): void {
    this.getCustomers()
  }

  getCustomers(): void {
    this.customerService.getAll().subscribe((data: any)=>{
      this.dataSource = data;
    })
  }

  displayEdit(customer: any): void {
    console.log(customer);
    this.router.navigateByUrl('/admin-dashboard/edit-customer/'+customer.id, { state: { item: customer  } });
  }

  displayCreateCustomer(): void {
    this.router.navigateByUrl('/admin-dashboard/create-customer');
  }

  delete(customer: any): void {
    console.log(customer);
    this.customerService.delete(customer).subscribe((data: any)=>{
      this.getCustomers()
    })
  }
}
