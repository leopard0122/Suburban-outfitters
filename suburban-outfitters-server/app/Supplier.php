<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    //
    protected $fillable = ['name','email','address','phone'];

    public function products()
    {
        return $this->hasMany('App\Product');
    }

    public function inventory()
    {
        return $this->hasMany('App\Inventory');
    }

}
