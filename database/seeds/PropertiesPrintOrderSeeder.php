<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PropertiesPrintOrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $props = \Modules\Good\Entities\GoodPropertyItem::where('name','material')->where('type','print_order')->first();

        if(!$props){
            DB::table('good_property_items')->insert([
                "name" => "material",
                "type" => "print_order",
            ]);
        }

        $props = \Modules\Good\Entities\GoodPropertyItem::where('name','color')->where('type','print_order')->first();

        if(!$props){
            DB::table('good_property_items')->insert([
                "name" => "color",
                "type" => "print_order",
            ]);
        }

        $props = \Modules\Good\Entities\GoodPropertyItem::where('name','outsource')->where('type','print_order')->first();

        if(!$props){
            DB::table('good_property_items')->insert([
                "name" => "outsource",
                "type" => "print_order",
            ]);
        }


    }
}
