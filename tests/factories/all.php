<?php

$factory('App\Base', [
    'name' => $faker->name,
    'address' => $faker->sentence
]);

$factory('App\Room', [
    'name' => $faker->name,
    'base_id' => 'factory:App\Base'
]);