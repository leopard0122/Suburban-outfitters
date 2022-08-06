<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderStatus extends Model
{
    //
    protected $fillable = ['order_id', 'status'];
}
