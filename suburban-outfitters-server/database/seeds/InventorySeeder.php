<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class InventorySeeder extends Seeder
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
        for ($x = 0; $x <= 20; $x++) {
            DB::table('inventories')->insert([
                'product_id' => $x,
                'supplier_id' => $x,
                'quantity' => $faker->randomDigit()
            ]);
        }
    }
}
