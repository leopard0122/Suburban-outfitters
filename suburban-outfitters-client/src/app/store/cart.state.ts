import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { patch, append, updateItem, removeItem } from '@ngxs/store/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ICartItem } from '../models/cart-item.model';
import { Injectable } from '@angular/core';
import { CheckoutService } from '../services/checkout.service';
import { tap } from 'rxjs/internal/operators/tap';
import { catchError } from 'rxjs/internal/operators/catchError';
import { CustomerService } from '../services/customer.service';
import { IOrderRequest, IOrderResponse } from '../models/order.model';
import { AuthService } from '../services/auth.service';
import { IOrderLineItem } from '../models/order-line-item';
import { Router } from '@angular/router';
import * as cartActions from './cart.actions';

export interface CartStateModel {
  loading: boolean;
  items: ICartItem[];
  shippingForm: {};
  paymentForm: {};
}

@State<CartStateModel>({
  name: 'cartState',
  defaults: {
    loading: false,
    items: [],
    shippingForm: {
      model: undefined,
      dirty: false,
      status: '',
      errors: {}
    },
    paymentForm: {
      model: undefined,
      dirty: false,
      status: '',
      errors: {}
    }
  },
})
@Injectable()
export class CartState {

  @Selector()
  static loading(state: CartStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static items(state: CartStateModel): ICartItem[] {
    return state.items;
  }

  @Selector()
  static itemCount(state: CartStateModel): number {
    return state.items.reduce((a, b) => a + (b.quantity || 0), 0);
  }

  @Selector()
  static total(state: CartStateModel): number {
    return state.items.reduce((a, b) => a + ((b.price * b.quantity) || 0), 0);
  }

  constructor(
    private store: Store,
    private snackbar: MatSnackBar,
    private customerService: CustomerService,
    private checkoutService: CheckoutService,
    private router: Router,
    private authService: AuthService
  ) { }

  @Action(cartActions.AddItemAction)
  async AddItemAction(
    ctx: StateContext<CartStateModel>,
    { payload }: cartActions.AddItemAction
  ) {
    const state = ctx.getState();
    const existingCartItem = state.items.find(i => i.product_id === payload.product_id);
    if (!existingCartItem) {
      ctx.setState(
        patch({
          items: append([payload])
        })
      );
    } else {
      ctx.setState(
        patch({
          // tslint:disable-next-line: max-line-length
          items: updateItem(item => item.product_id === payload.product_id, patch({ quantity: (existingCartItem.quantity + payload.quantity) }))
        })
      );
    }

    // TODO: calculate total
    this.snackbar.open('Added to Cart', null, {
      duration: 3000,
      verticalPosition: 'bottom'
    });
  }

  @Action(cartActions.RemoveItemAction)
  async RemoveItemAction(
    ctx: StateContext<CartStateModel>,
    { payload }: cartActions.RemoveItemAction
  ) {
    const state = ctx.getState();
    const existingCartItem = state.items.find(i => i.product_id === payload.product_id);

    const canSubtract = existingCartItem.quantity - 1 <= 0 ? false : true;

    if (!canSubtract) {
      ctx.setState(
        patch({
          items: removeItem(item => item.product_id === payload.product_id)
        })
      );
    } else {
      ctx.setState(
        patch({
          items: updateItem(item => item.product_id === payload.product_id, patch({ quantity: (existingCartItem.quantity - 1) }))
        })
      );
    }

    // TODO: calculate total
    this.snackbar.open('Removed item from Cart', null, {
      duration: 3000,
      verticalPosition: 'bottom'
    });
  }

  @Action(cartActions.GetCustomerInfoAction)
  async GetCustomerInfoAction(
    { patchState, dispatch }: StateContext<CartStateModel>,
    { payload }: cartActions.GetCustomerInfoAction
  ) {
    patchState({ loading: true });
    this.customerService.GetCustomer(payload)
      .pipe(
        tap((response: any) => {
          dispatch(new cartActions.SubmitOrderActionSuccess(response));
        }),
        catchError(error => dispatch(new cartActions.SubmitOrderActionFail(error)))
      );
  }

  @Action(cartActions.GetCustomerInfoActionSuccess)
  async GetCustomerInfoActionSuccess(
    { patchState }: StateContext<CartStateModel>,
    { payload }: cartActions.GetCustomerInfoActionSuccess
  ) {
    patchState({ loading: false });
    // TODO: patch customer data form
  }

  @Action(cartActions.GetCustomerInfoActionFail)
  async GetCustomerInfoActionFail(
    { patchState }: StateContext<CartStateModel>,
    { payload }: cartActions.SubmitOrderActionFail
  ) {
    patchState({ loading: false });
    this.snackbar.open(`Error retriving customer data: ${payload}`, null, {
      duration: 3000,
      verticalPosition: 'bottom'
    });
  }

  @Action(cartActions.SubmitOrderAction)
  async SubmitOrderAction(
    ctx: StateContext<CartStateModel>
  ) {
    const currentState = ctx.getState();
    const total = currentState.items.reduce((a, b) => a + ((b.price * b.quantity) || 0), 0);
    ctx.patchState({ loading: true });
    const newOrder: IOrderRequest = {
      customer_id: this.authService.currentCustomer.id,
      order_status_id: 1,
      order_total: total,
      order_date: new Date(),
      departure_date: null,
      delivery_date: null,
      purchase_date: null,
      return_date: null
    };

    this.checkoutService.AddOrder(newOrder)
      .pipe(
        tap((response: IOrderResponse) => {
          ctx.dispatch(new cartActions.AddOrderLineItemsAction(response.id));
        }),
        catchError(error => ctx.dispatch(new cartActions.SubmitOrderActionFail(error)))
      ).subscribe();
  }

  @Action(cartActions.AddOrderLineItemsAction)
  async AddOrderLineItemsAction(
    ctx: StateContext<CartStateModel>,
    { payload }: cartActions.AddOrderLineItemsAction
  ) {
    ctx.patchState({ loading: false });
    const currentState = ctx.getState();
    const orderLineItems: IOrderLineItem[] = [];
    currentState.items.forEach(cartItem => {
      const newOrderLineItem: IOrderLineItem = {
        order_id: payload,
        product_id: cartItem.product_id,
        inventory_id: cartItem.inventory_id,
        name: cartItem.name,
        quantity: cartItem.quantity,
        price: cartItem.price,
        is_returned: 0,
        created_at: new Date(),
        updated_at: null
      };
      orderLineItems.push(newOrderLineItem);
    });

    // submit line items one at a time
    orderLineItems.forEach(lineItem => {
      this.checkoutService.AddOrderLineItems(lineItem)
        .pipe(
          tap((response: any) => {
            ctx.dispatch(new cartActions.SubmitOrderActionSuccess(payload));
          }),
          catchError(error => ctx.dispatch(new cartActions.SubmitOrderActionFail(error)))
        ).subscribe();
    });
  }

  @Action(cartActions.SubmitOrderActionSuccess)
  async SubmitOrderActionSuccess(
    { patchState }: StateContext<CartStateModel>,
    { payload }: cartActions.SubmitOrderActionSuccess
  ) {
    patchState({
      loading: false,
      items: [],
      shippingForm: {
        model: undefined,
        dirty: false,
        status: '',
        errors: {}
      },
      paymentForm: {
        model: undefined,
        dirty: false,
        status: '',
        errors: {}
      }
    });

    this.snackbar.open(`Order Complete: #${payload}`, null, {
      duration: 3000,
      verticalPosition: 'bottom'
    });
  }

  @Action(cartActions.SubmitOrderActionFail)
  async SubmitOrderActionFail(
    { patchState }: StateContext<CartStateModel>,
    { payload }: cartActions.SubmitOrderActionFail
  ) {

    console.log('Payload', payload);
    patchState({ loading: false });
    this.snackbar.open(`Error Completing Order: ${payload}`, null, {
      duration: 3000,
      verticalPosition: 'bottom'
    });
  }
}
