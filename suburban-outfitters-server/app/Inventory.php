<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    //
    protected $fillable = ['product_id','quantity'];
    
    public function deductQuantity($quantity)
    {
        $this->quantity = ($this->quantity-$quantity);
        return $this->update();
    }
}
