<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use App\Customer; 
use App\CreditCard; 
use App\Order; 

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'firstName', 'lastName', 'username',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getCustomer()
    {

      $customer = Customer::where('user_id', $this->id)->get();
  
      return $customer;
    }

    public function getPaymentMethods()
    {
      $customers = Customer::where('user_id', $this->id)->get();
      $cards = CreditCard::where('customer_id', $customers[0]->id)->get();
      return $cards;
    }

    public function getOrders()
    {
      $customer = Customer::where('user_id', $this->id)->get()->first();
      $orders = Order::where('customer_id', $customer->id)->get();
      return $orders;
    }
    

}
