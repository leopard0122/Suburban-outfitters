import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router, RouterState, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { OrdersService } from '../../../services/orders.service';
import { OrderLineItemService } from '../../../services/order-line-item.service';
import { IOrderResponse, IOrderDetial } from 'src/app/models/order.model';
import { IOrderLineItem } from 'src/app/models/order-line-item';
import { ProductService } from 'src/app/services/product.service';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  order: IOrderDetial;
  constructor(private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
    private ordersService: OrdersService,
    private productService: ProductService,
    private orderLineItemService: OrderLineItemService,
    private inventoryService: InventoryService
  ) { }

  loadOrderDetails(id: any) {
    this.ordersService.getBy(id).subscribe((data: any) => {
      this.order = data;
      console.log(data)
    });
  }



  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          console.log(params['id'])
          this.loadOrderDetails(params['id'])
        }
      );
  }


  onReturnItem(lineItem: IOrderLineItem) {
    this.productService.getBy(lineItem.product_id).subscribe((data: any) => {
      let itemInventory = data.inventory;
      itemInventory.quantity += lineItem.quantity;
      this.inventoryService.update(itemInventory).subscribe((data: any) => {
        lineItem.is_returned = 1;
        this.orderLineItemService.update(lineItem).subscribe((data: IOrderLineItem) => {
          const index = this.order.orderlineitems.findIndex(item => item.product_id === lineItem.product_id);
          this.order.orderlineitems[index].is_returned = 1;
        });
      });
    });
  }

}
