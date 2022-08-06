<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\CreditCard;

class CreditCardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return CreditCard::all();
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
        $creditcard = CreditCard::create($request->all());
        return response()->json($creditcard, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(CreditCard $creditcard)
    {
        return $creditcard;
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
    public function update(Request $request, CreditCard $creditcard)
    {
        //
        Log::channel('stderr')->info('new request!');
        
        Log::channel('stderr')->info($request->all());

        $card = CreditCard::where('id', $request->all()["id"])->get()->first();
        Log::channel('stderr')->info($card);
        $card->first_name = $request->all()["first_name"];
        $card->last_name = $request->all()["last_name"];
        $card->card_number = $request->all()["card_number"];
        $card->expiration = $request->all()["expiration"];
        $card->save();

        Log::channel('stderr')->info($card);

        $creditcard->update($request->all());
        Log::channel('stderr')->info($creditcard);
        return response()->json($creditcard, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(CreditCard $creditcard)
    {
        $creditcard->delete();
        return response()->json(null, 204);
    }
}
