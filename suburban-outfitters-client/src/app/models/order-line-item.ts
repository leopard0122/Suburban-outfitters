export interface IOrderLineItem {
  order_id: number;
  product_id: number;
  inventory_id: number;
  name: string;
  quantity: number;
  price: number;
  is_returned: number;
  created_at: Date;
  updated_at?: Date;
}
