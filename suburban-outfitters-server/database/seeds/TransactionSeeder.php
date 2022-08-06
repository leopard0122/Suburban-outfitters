<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $faker = Faker::create();
        for ($x = 0; $x <= 100; $x++) {
            DB::table('transactions')->insert([
                'credit_card_id' => $faker->randomDigit(),
                'amount' => $faker->randomFloat($nbMaxDecimals = 2, $min = 0, $max = 100)
            ]);
        } 
    }
}
