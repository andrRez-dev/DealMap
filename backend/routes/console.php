<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::call(function(){
    $offerIds = DB::table('votes')
        ->select('offer_id', 'vote', DB::raw('COUNT(*) as count'))
        ->groupBy('offer_id', 'vote')
        ->havingRaw('COUNT(*) >= 3')
        ->pluck('offer_id');
    
    if($offerIds->isNotEmpty()){
        DB::table('offers')->where('id', $offerIds)->update(['is_active' => false]);
        DB::table('votes')->where('offer_id', $offerIds)->delete();
    }
})->everyFiveMinutes();

Schedule::call(function(){
    DB::table('offers')
        ->where('starts_at', '>=', Carbon::now()->addDays(30))
        ->update(['is_active' => false]);
})->daily();


