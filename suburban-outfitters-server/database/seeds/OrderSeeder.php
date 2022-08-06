<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class OrderSeeder extends Seeder
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
        for ($x = 0; $x <= 10; $x++) {
            DB::table('orders')->insert([
                'customer_id' => $faker->randomDigit(),
                'order_status_id' => $faker->randomDigit(),
                'order_total' => $faker->randomFloat($nbMaxDecimals = 2, $min = 0, $max = 100),
                'order_date' => $faker->dateTime($max = 'now', $timezone = null),
                'departure_date' => $faker->dateTime($max = 'now', $timezone = null),
                'delivery_date' => $faker->dateTime($max = 'now', $timezone = null),
                'purchase_date' => $faker->dateTime($max = 'now', $timezone = null),
                'return_date' => $faker->dateTime($max = 'now', $timezone = null)
            ]);
        }
    }
}
