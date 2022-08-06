<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    //
    protected $fillable = ['customer_id', 'order_status_id', 'order_total', 'order_date', 'departure_date', 'delivery_date', 'purchase_date', 'return_date'];


    public function orderstatus()
    {
        return $this->hasMany('App\OrderStatus');
    }


    public function orderlineitems()
    {
        return $this->hasMany('App\OrderLineItem');
    }
}
