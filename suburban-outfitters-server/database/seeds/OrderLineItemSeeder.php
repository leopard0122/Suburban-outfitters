<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class OrderLineItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $products = array("Ocean Blue Shirt","Classic Varsity Top","Classic Varsity Top","Classic Varsity Top","Yellow Wool Jumper","Floral White Top","Striped Silk Blouse","Classic Leather Jacket","Dark Denim Top","Navy Sports Jacket","Soft Winter Jacket","Black Leather Bag","Zipped Jacket","Silk Summer Top","Long Sleeve Cotton Top","Chequered Red Shirt","White Cotton Shirt","Olive Green Jacket","Blue Silk Tuxedo","Red Sports Tee","Striped Skirt and Top","LED High Tops");
        
        $faker = Faker::create();
        for ($x = 0; $x <= 100; $x++) {
            DB::table('order_line_items')->insert([
                'order_id' => $faker->randomDigit(),
                'product_id' => $faker->randomDigit(),
                'inventory_id' => $faker->randomDigit(),
                'name' => $faker->randomElement($products),
                'quantity' => $faker->randomDigit(),
                'price' => $faker->randomFloat($nbMaxDecimals = 2, $min = 0, $max = 100)
            ]);
        }
    }
}
