<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $products = array("Ocean Blue Shirt","Classic Varsity Top","Classic Varsity Top","Classic Varsity Top","Yellow Wool Jumper","Floral White Top","Striped Silk Blouse","Classic Leather Jacket","Dark Denim Top","Navy Sports Jacket","Soft Winter Jacket","Black Leather Bag","Zipped Jacket","Silk Summer Top","Long Sleeve Cotton Top","Chequered Red Shirt","White Cotton Shirt","Olive Green Jacket","Blue Silk Tuxedo","Red Sports Tee","Striped Skirt and Top","LED High Tops");
        $descriptions = array("Ocean blue cotton shirt with a narrow collar and buttons down the front and long sleeves. Comfortable fit and tiled kalidoscope patterns. '","Womens casual varsity top, This grey and black buttoned top is a sport-inspired piece complete with an embroidered letter. '","Womens casual varsity top, This grey and black buttoned top is a sport-inspired piece complete with an embroidered letter. '","Womens casual varsity top, This grey and black buttoned top is a sport-inspired piece complete with an embroidered letter. '","Knitted jumper in a soft wool blend with low dropped shoulders and wide sleeves and think cuffs. Perfect for keeping warm during Fall. '","Stylish sleeveless white top with a floral pattern. '","Ultra-stylish black and red striped silk blouse with buckle collar and matching button pants. '","Womans zipped leather jacket. Adjustable belt for a comfortable fit, complete with shoulder pads and front zip pocket. '","Classic dark denim top with chest pockets, long sleeves with buttoned cuffs, and a ripped hem effect.'","Long-sleeved navy waterproof jacket in thin, polyester fabric with a soft mesh inside. The durable water-repellent finish means you'll be kept comfortable and protected when out in all weathers.'","Thick black winter jacket, with soft fleece lining. Perfect for those cold weather days.'","Womens black leather bag, with ample space. Can be worn over the shoulder, or remove straps to carry in your hand. '","Dark navy and light blue men's zipped waterproof jacket with an outer zipped chestpocket for easy storeage.'","Silk womens top with short sleeves and number pattern.'","Black cotton womens top, with long sleeves, no collar and a thick hem. '","Classic mens plaid flannel shirt with long sleeves, in chequered style, with two chest pockets.'","Plain white cotton long sleeved shirt with loose collar. Small buttons and front pocket. '","Loose fitting olive green jacket with buttons and large pockets. Multicoloured pattern on the front of the shoulders.'","Blue silk tuxedo with marbled aquatic pattern and dark lining. Sleeves are complete with rounded hem and black buttons.'","Women's red sporty t-shirt with colorful details on the sleeves and a small white pocket.'","Black cotton top with matching striped skirt. '","Black high top shoes with green LED lights in the sole, tied up with laces and a buckle. '");


        $faker = Faker::create();
        for ($x = 0; $x <= 20; $x++) {
            DB::table('products')->insert([
                'name' => $products[$x],
                'description' => $descriptions[$x],
                'supplier_id' => $x,
                'price' => $faker->randomFloat($nbMaxDecimals = 2, $min = 0, $max = 100),
                'category' => $faker->randomElement(['womens', 'mens', 'kids', 'accessories']),
                'size' => $faker->randomElement(['sm', 'md', 'lg']),
                'image_url' => 'https://picsum.photos/200?random='.$x,
                'gender' => $faker->randomElement(['mens', 'womens']),
                'type' => $faker->randomElement(['sm', 'md', 'lg']),             
            ]);            
        } 
    }
}


