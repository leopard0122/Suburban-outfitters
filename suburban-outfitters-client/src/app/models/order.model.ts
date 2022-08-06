import { IOrderLineItem } from './order-line-item';

export interface IOrderRequest {
  customer_id: number;
  order_status_id: number;
  order_total: number;
  order_date: Date;
  departure_date?: Date;
  delivery_date?: Date;
  purchase_date?: Date;
  return_date?: Date;
}

export interface IOrderResponse {
  id: number;
  customer_id: number;
  order_status_id: number;
  order_total: number;
  order_date: Date;
  departure_date?: Date;
  delivery_date?: Date;
  purchase_date?: Date;
  return_date?: Date;
}

export interface IOrderDetial {
  id: number;
  customer_id: number;
  order_status_id: number;
  order_total: number;
  order_date: Date;
  departure_date?: Date;
  delivery_date?: Date;
  purchase_date?: Date;
  return_date?: Date;
  orderlineitems: IOrderLineItem[];
}
