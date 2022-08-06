import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router, RouterState } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-inventory-item',
  templateUrl: './create-inventory-item.component.html',
  styleUrls: ['./create-inventory-item.component.scss']
})
export class CreateInventoryItemComponent implements OnInit {
  newFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.newFormGroup = this._formBuilder.group({
      InventoryID: ['', Validators.required],
      cardType: ['', Validators.required],
      ProductID: ['', Validators.required],
      Quantity: ['', Validators.required],
      cardImageUrl: ['', Validators.required]
    });
  }

  create(): void {
    console.log("create");
    console.log(this.newFormGroup.value);
    // const card: GiftCard = this.newFormGroup.value
    // this.giftCardService.addGiftCard(card).subscribe((data: any)=>{
    //   this.router.navigateByUrl('/card-list', { state: { item: data  } });
    // })
  }
}
