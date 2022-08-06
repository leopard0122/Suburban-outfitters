<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class SupplierSeeder extends Seeder
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
            DB::table('suppliers')->insert([
                'name' => $faker->company(),
                'email' => $faker->companyEmail(),
                'address' => $faker->address(),
                'phone' => $faker->phoneNumber()
            ]);
        } 
    }
}
