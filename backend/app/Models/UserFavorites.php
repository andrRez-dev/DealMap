<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserFavorites extends Model
{
    protected $table = "user_favorites";

    protected $fillable = [
        'user_id',
        'offer_id'
    ];
}
