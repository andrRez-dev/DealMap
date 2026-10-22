<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    protected $fillable = [
        'name',
        'email',
        'password_hash',
        'is_active'
    ];
}
