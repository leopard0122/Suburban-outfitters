<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class UserSeeder extends Seeder
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
        for ($x = 0; $x <= 5; $x++) {
            DB::table('users')->insert([
                'username' => Str::random(10),
                'firstName' => $faker->firstName,
                'lastName' => $faker->lastName,
                'role' => 'user',
                'email' => Str::random(10).'@gmail.com',
                'password' => Hash::make('password'),
            ]);            
        } 
        DB::table('users')->insert([
            'username' => 'user',
            'firstName' => 'jesse',
            'lastName' => 'spencer',
            'role' => 'admin',
            'email' => 'jspenc72@gmail.com',
            'password' => Hash::make('password')
        ]);    

        DB::table('users')->insert([
            'username' => 'user',
            'firstName' => 'sean',
            'lastName' => 'michials',
            'role' => 'admin',
            'email' => 'sean@me.com',
            'password' => Hash::make('password')
        ]);    
       
    }
}
