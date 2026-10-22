<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Offer extends Model
{
    use HasUuids;

    protected $fillable = [
        'product_id',
        'store_id',
        'user_id',
        'original_price',
        'discounted_price',
        'discount_percent',
        'title',
        'description',
        'starts_at',
        'expires_at',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'original_price' => 'decimal:2',
            'discounted_price' => 'decimal:2',
            'discount_percent' => 'integer',
            'starts_at' => 'date:Y-m-d',
            'expires_at' => 'date:Y-m-d',
            'is_active' => 'boolean',
            'works_votes' => 'integer',
            'expired_votes' => 'integer',
        ];
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function store(): BelongsTo
    {
        return $this->belongsTo(Store::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function votes(): HasMany
    {
        return $this->hasMany(Vote::class);
    }
}
