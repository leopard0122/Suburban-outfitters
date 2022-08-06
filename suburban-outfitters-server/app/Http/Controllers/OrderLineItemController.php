<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


use App\OrderLineItem;
use App\Inventory;

class OrderLineItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return OrderLineItem::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Log::channel('stderr')->info('new request!');
        $orderlineitem = OrderLineItem::create($request->all());

        $inv = Inventory::where('product_id', $orderlineitem->product_id)->get()->first();
        Log::channel('stderr')->info($inv);
        //Deduct the quantity from the quantity in stock.
        $uinv = $inv->deductQuantity($orderlineitem->quantity);
        Log::channel('stderr')->info($inv);

        // $inventory->quantity = $inventory->quantity-$orderlineitem->quantity;
        // Log::channel('stderr')->info($inventory);

        return response()->json($orderlineitem, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(OrderLineItem $orderlineitem)
    {
        Log::channel('stderr')->info($orderlineitem);
        $p = OrderLineItem::with('product', 'inventory')->find($orderlineitem->id);
        Log::channel('stderr')->info('test');
        return $orderlineitem;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, OrderLineItem $orderlineitem)
    {
        //
        $orderlineitem->update($request->all());
        return response()->json($orderlineitem, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(OrderLineItem $orderlineitem)
    {
        $orderlineitem->delete();
        return response()->json(null, 204);
    }
}
