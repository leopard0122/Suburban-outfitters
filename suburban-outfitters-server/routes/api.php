<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Custom Methods

Route::post('login', 'API\AuthController@login');
Route::post('register', 'API\AuthController@register');
Route::middleware('auth:api')->post('updatepassword', 'API\AuthController@updatepassword');
Route::middleware('auth:api')->get('/profile', function (Request $request) {
    return $request->user();
});



Route::middleware('auth:api')->get('/myOrders', function (Request $request) {
    $currentUser = $request->user();
    $orders = $currentUser->getOrders();
    return $orders;
});

Route::middleware('auth:api')->get('/customer', function (Request $request) {
    $currentUser = $request->user();
    $customer = $currentUser->getCustomer();
    return $customer;
});

Route::middleware('auth:api')->get('/mypaymentmethods', function (Request $request) {
    $currentUser = $request->user();
    $paymentmethods = $currentUser->getPaymentMethods();
    return $paymentmethods;
});

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::resources([
    'users' => 'UsersController',
    'credit-cards' => 'CreditCardController',
    'customers' => 'CustomerController',
    // 'orders' => 'OrderController',
    'products' => 'ProductController',
    'suppliers' => 'SupplierController',
    'inventory' => 'InventoryController',   
    'order-line-item' => 'OrderLineItemController',
    'order-status' => 'OrderStatusController',    
]);

Route::get('orders', 'OrderController@index');
Route::get('orders/{order}', 'OrderController@show');
Route::post('orders', 'OrderController@store');
Route::put('orders/{order}', 'OrderController@update');
Route::delete('orders/{order}', 'OrderController@destroy');
Route::get('orders/{order}/order-line-items', 'OrderController@getOrderLineItems');


// Route::get('customers/{customers}', 'CustomerController@show');

// Route::resource('supplier', 'TransactionController');

// Route::get('customers/{customers}', 'CustomerController@show');
// Route::post('customers', 'CustomerController@store');
// Route::put('customers/{customers}', 'CustomerController@update');
// Route::delete('customers/{customers}', 'CustomerController@destroy');

// Route::get('transaction', 'TransactionController@index');
// Route::get('transactions/{transaction}', 'TransactionController@show');
// Route::post('transactions', 'TransactionController@store');
// Route::put('transactions/{transaction}', 'TransactionController@update');
// Route::delete('transactions/{transaction}', 'TransactionController@destroy');
