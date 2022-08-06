import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router, RouterState } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupplierService } from "../../../services/supplier.service";
import { ISupplier } from "../../../models/supplier.model";

@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrls: ['./create-supplier.component.scss']
})
export class CreateSupplierComponent implements OnInit {
  newFormGroup: FormGroup;

  constructor(private supplierService: SupplierService, private _formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.newFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      cardImageUrl: ['', Validators.required]
    });
  }

  create(): void {
    console.log("create");
    console.log(this.newFormGroup.value);
    const supplier: ISupplier = this.newFormGroup.value
    this.supplierService.add(supplier).subscribe((data: any)=>{
      this.router.navigateByUrl('/admin-dashboard/manage-suppliers');
    })
  }
}
