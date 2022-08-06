import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router, RouterState, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from "../../../services/product.service";
import { IProduct } from "../../../models/product.model";
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  editFormGroup: FormGroup;
  productQuantityFormGroup: FormGroup;
  state$: any;
  product: any;

  constructor(private productService: ProductService, 
              private inventoryService: InventoryService,
                  public route: ActivatedRoute,
                   private _formBuilder: FormBuilder, private location: Location, private router: Router) { }

  ngOnInit(): void {
    this.editFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      size: ['', Validators.required],
      image_url: ['', Validators.required],
      gender: ['', Validators.required],
      type: ['', Validators.required],
      cardImageUrl: ['', Validators.required],
      id: ['', Validators.required]
    });
    this.productQuantityFormGroup = this._formBuilder.group({
      quantity: ['', Validators.required]
    });
    this.load()
  }

  load(): void {
    this.state$ = this.location.getState();
    var id = this.route.snapshot.paramMap.get('id')
    if(this.route.snapshot.paramMap.get('id')){
      this.productService.getBy(parseInt(id)).subscribe((data: any)=>{
        console.log(data)
        this.product = data;
        this.editFormGroup = this._formBuilder.group({
          name: [data.name, Validators.required],
          price: [data.price, Validators.required],
          size: [data.size, Validators.required],
          image_url: [data.image_url, Validators.required],
          gender: [data.gender, Validators.required],
          type: [data.type, Validators.required],
          cardImageUrl: [data.cardImageUrl, Validators.required],
          id: [data.id, Validators.required]
        });

        this.productQuantityFormGroup = this._formBuilder.group({
          quantity: [data.inventory.quantity, Validators.required]
        });
      })  
      this
    }else{

    }
  }

  submit(): void {
    console.log("submit");
    console.log(this.editFormGroup.value);
    const product: IProduct = this.editFormGroup.value
    this.productService.update(product).subscribe((data: any)=>{
      this.router.navigateByUrl('/admin-dashboard/manage-products', { state: { item: data  } });
    })
  }

  updateQuantity(): void {
    console.log(this.productQuantityFormGroup.value);
    this.product.inventory.quantity = this.productQuantityFormGroup.value.quantity;
    this.inventoryService.update(this.product.inventory).subscribe((data: any)=>{
      
      console.log(data)
      this.load()
    })
  }
}
