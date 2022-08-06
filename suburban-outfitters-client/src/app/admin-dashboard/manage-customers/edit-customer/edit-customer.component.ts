import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router, RouterState, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from "../../../services/customer.service";
import { ICustomer } from "../../../models/customer.model";
@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {
  editFormGroup: FormGroup;
  state$: any

  constructor(private customerService: CustomerService, public route: ActivatedRoute, private _formBuilder: FormBuilder, private location: Location, private router: Router) { }

  ngOnInit(): void {
    this.editFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required]
    });
    this.load()
  }

  load(): void {
    this.state$ = this.location.getState();
    var id = this.route.snapshot.paramMap.get('id')
    if(this.route.snapshot.paramMap.get('id')){
      this.customerService.getBy(parseInt(id)).subscribe((data: any)=>{
        this.editFormGroup = this._formBuilder.group({
          name: [data.name, Validators.required],
          address: [data.address, Validators.required],
          phone: [data.phone, Validators.required],
          id: [data.id, Validators.required],
          user_id: [data.user_id, Validators.required]
        });
      })  
    }else{

    }
  }

  submit(): void {
    console.log("submit");
    console.log(this.editFormGroup.value);
    const item: ICustomer = this.editFormGroup.value
    this.customerService.update(item).subscribe((data: any)=>{
      this.router.navigateByUrl('/admin-dashboard/manage-customers');
    })
  }
}
