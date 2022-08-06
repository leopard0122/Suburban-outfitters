<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class OrderStatusSeeder extends Seeder
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
            DB::table('order_statuses')->insert([
                'order_id' => $faker->randomDigit(),
                'status' => $faker->randomElement(['created', 'paid', 'returned'])
            ]);
        }
    }
}
