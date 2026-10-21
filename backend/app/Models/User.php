<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasUuids, HasApiTokens;

    protected $table = 'users';

    protected $fillable = [
        'name',
        'email',
        'password_hash',
        'is_active'
    ];

    protected $hidden = [
        'password_hash'
    ];

    public function getAuthPassword(){
        return $this->password_hash;
    }
}
