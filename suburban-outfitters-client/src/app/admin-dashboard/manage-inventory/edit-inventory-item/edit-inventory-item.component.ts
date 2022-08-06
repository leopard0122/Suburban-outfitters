import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router, RouterState } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IInventory } from '../../../models/inventory.model';
import { InventoryService } from '../../../services/inventory.service';

@Component({
  selector: 'app-edit-inventory-item',
  templateUrl: './edit-inventory-item.component.html',
  styleUrls: ['./edit-inventory-item.component.scss']
})
export class EditInventoryItemComponent implements OnInit {
  editFormGroup: FormGroup;

  constructor(private inventoryService: InventoryService, private _formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.editFormGroup = this._formBuilder.group({
      InventoryID: ['', Validators.required],
      ProductID: ['', Validators.required],
      cardValue: ['', Validators.required],
      Quantity: ['', Validators.required],
      cardImageUrl: ['', Validators.required]
    });
  }

  submit(): void {
    console.log("create");
    console.log(this.editFormGroup.value);
    const item: IInventory = this.editFormGroup.value
    this.inventoryService.update(item).subscribe((data: any)=>{
      this.router.navigateByUrl('/admin-dashboard/manage-inventory');
    })
  }
}
