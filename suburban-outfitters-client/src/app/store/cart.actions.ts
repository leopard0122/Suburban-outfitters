import { ICartItem } from '../models/cart-item.model';

export class AddItemAction {
  static readonly type = '[CartState] Add Item';
  constructor(public payload: ICartItem) { }
}

export class RemoveItemAction {
  static readonly type = '[CartState] Remove Item';
  constructor(public payload: ICartItem) { }
}

export class GetCustomerInfoAction {
  static readonly type = '[CartState] Get Customer Info';
  constructor(public payload: any) { }
}

export class GetCustomerInfoActionSuccess {
  static readonly type = '[CartState] Get Customer Info Success';
  constructor(public payload: any) { }
}

export class GetCustomerInfoActionFail {
  static readonly type = '[CartState] Get Customer Info Fail';
  constructor(public payload: any) { }
}

export class SubmitOrderAction {
  static readonly type = '[CartState] Submit Order';
}

export class SubmitOrderActionSuccess {
  static readonly type = '[CartState] Submit Order Success';
  constructor(public payload: number) { }
}

export class SubmitOrderActionFail {
  static readonly type = '[CartState] Submit Order Fail';
  constructor(public payload: any) { }
}

export class AddOrderLineItemsAction {
  static readonly type = '[CartState] Add Order Line Items';
  constructor(public payload: number) { }
}
