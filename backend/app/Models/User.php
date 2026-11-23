<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasUuids, HasApiTokens, CanResetPassword, Notifiable;

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

    public function offers(): HasMany
    {
        return $this->hasMany(Offer::class);
    }

    public function votes(): HasMany
    {
        return $this->hasMany(Vote::class);
    }
}
