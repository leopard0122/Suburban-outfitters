import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router, RouterState } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../../services/customer.service';
import { ICustomer } from '../../../models/customer.model';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit {
  newFormGroup: FormGroup;

  constructor(private customerService: CustomerService, private _formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.newFormGroup = this._formBuilder.group({
      title: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      user_id: ['', Validators.required],
    });
  }

  create(): void {
    console.log("create");
    console.log(this.newFormGroup.value);
    const customer: ICustomer = this.newFormGroup.value
    this.customerService.add(customer).subscribe((data: any)=>{
      this.router.navigateByUrl('/admin-dashboard/manage-customers');
    })
  }

}
