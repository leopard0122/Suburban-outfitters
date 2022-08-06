<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class CustomerSeeder extends Seeder
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
            DB::table('customers')->insert([
                'name' => $faker->company(),
                'user_id' => $x,
                'address' => $faker->address(),
                'phone' => $faker->phoneNumber()
            ]);
        } 
    }
}
