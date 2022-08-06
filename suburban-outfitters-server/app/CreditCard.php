<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CreditCard extends Model
{
    //
    protected $fillable = ['first_name', 'last_name', 'card_number', 'expiration'];

}
