import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router, RouterState, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { SupplierService } from "../../../services/supplier.service";
import { ISupplier } from "../../../models/supplier.model";
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.scss']
})
export class EditSupplierComponent implements OnInit {
  editFormGroup: FormGroup;
  state$: any
  inventory_units: any;
  supplier_inventory: any;
  constructor(private supplierService: SupplierService, 
            private productService: ProductService, 
            public route: ActivatedRoute, 
            private _formBuilder: FormBuilder, 
            private location: Location, 
            private router: Router) { }

  ngOnInit(): void {
    this.editFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      cardImageUrl: ['', Validators.required]
    });
    this.load();
  }

  load(): void {
    var id = this.route.snapshot.paramMap.get('id')
    if(this.route.snapshot.paramMap.get('id')){
      this.supplierService.getBy(parseInt(id)).subscribe((data: any)=>{
        this.supplier_inventory = data.inventory;
        this.displayInventoryProducts(data)
        this.editFormGroup = this._formBuilder.group({
          name: [data.name, Validators.required],
          email: [data.email, Validators.required],
          address: [data.address, Validators.required],
          phone: [data.phone, Validators.required],
          id: [data.id, Validators.required]
        });
      })
    }else{

    }
  }
  displayInventoryProducts(data):void {
    this.inventory_units = [];
    data.inventory.forEach(invProduct => {
      this.inventory_units.unshift(invProduct);
      this.productService.getBy(invProduct.product_id).subscribe((data: any) => {
        var index = this.inventory_units.findIndex(item => item.product_id === data.id);
        this.inventory_units[index].product = data;
        console.log(data)
      })
    });

  }
  submit(): void {
    console.log("submit");
    console.log(this.editFormGroup.value);
    const item: ISupplier = this.editFormGroup.value
    this.supplierService.update(item).subscribe((data: any)=>{
      this.router.navigateByUrl('/admin-dashboard/manage-suppliers');
    })
  }

}
