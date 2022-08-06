import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select, Store, Actions, ofActionSuccessful } from '@ngxs/store';
import { CartState } from '../store/cart.state';
import { ICartItem } from '../models/cart-item.model';
import { Observable } from 'rxjs/internal/Observable';
import { removeItem } from '@ngxs/store/operators';
import { RemoveItemAction, SubmitOrderAction, SubmitOrderActionSuccess } from '../store/cart.actions';
import { IProduct } from '../models/product.model';
import { AuthService } from '../services/auth.service';
import { UpdateFormValue } from '@ngxs/form-plugin';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @Select(CartState.items) cartItems$: Observable<ICartItem[]>;
  @Select(CartState.itemCount) cartItemCount$: Observable<number>;
  @Select(CartState.total) total$: Observable<number>;

  shippingForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address: ['', Validators.required]
  });

  paymentForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    cardNumber: ['', Validators.required],
    expiration: ['', Validators.required],
  });

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private custService: CustomerService,
    private actions$: Actions,
    private router: Router
  ) {
    this.actions$.pipe(ofActionSuccessful(SubmitOrderActionSuccess))
      .subscribe(() => this.router.navigate(['/customer-dashboard']));
  }

  ngOnInit() {
    if (this.authService.currentUser) {
      this.store.dispatch(new UpdateFormValue({
        path: 'cartState.shippingForm',
        value: {
          firstName: this.authService.currentUser.firstName,
          lastName: this.authService.currentUser.lastName,
          address: this.authService.currentCustomer.address
        }
      }));
      this.store.dispatch(new UpdateFormValue({
        path: 'cartState.paymentForm',
        value: {
          firstName: this.authService.currentUserPaymentMethods.first_name,
          lastName: this.authService.currentUserPaymentMethods.last_name,
          cardNumber: this.authService.currentUserPaymentMethods.card_number,
          expiration: this.authService.currentUserPaymentMethods.expiration
        }
      }));
      //TODO: GET CREDIT CARD
      //this.custService.getCustomerCreditCard(this.authService.currentCustomer.id).subscribe();
    }
  }

  onRemoveItemFromCart(cartItem: ICartItem) {
    this.store.dispatch(new RemoveItemAction(cartItem));
  }

  onSubmitOrder() {
    console.log('onSubmitOrder');
    this.store.dispatch(new SubmitOrderAction());
  }

}
