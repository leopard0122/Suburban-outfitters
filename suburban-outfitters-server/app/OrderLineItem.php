<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderLineItem extends Model
{
    //
    protected $fillable = ['order_id', 'product_id', 'inventory_id', 'name', 'quantity', 'price'];
    
    public function order()
    {
        return $this->belongsTo('App\Order');
    }

    public function product()
    {
        return $this->belongsTo('App\Product');
    }

    public function inventory()
    {
        return $this->belongsTo('App\Inventory');
    }
}
