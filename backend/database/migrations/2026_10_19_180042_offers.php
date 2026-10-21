<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('offers', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(DB::raw('gen_random_uuid()'));

            $table->foreignUuid('product_id')->constrained('products')->cascadeOnDelete();
            $table->foreignUuid('store_id')->constrained('stores')->cascadeOnDelete();
            $table->foreignUuid('user_id')->constrained('users')->cascadeOnDelete();

            $table->decimal('original_price', 10, 2)->nullable();
            $table->decimal('discounted_price', 10, 2);
            $table->smallInteger('discount_percent')->nullable();

            $table->string('title', 200)->nullable();
            $table->text('description')->nullable();

            $table->date('starts_at')->nullable();
            $table->date('expires_at')->nullable();

            $table->boolean('is_active')->default(true);
            $table->timestampsTz();

            $table->index('product_id', 'idx_offers_product');
            $table->index('store_id', 'idx_offers_store');
            $table->index('user_id', 'idx_offers_user');
            $table->index('expires_at', 'idx_offers_expires');
        });

        // Частичный индекс для активных предложений
        DB::statement('CREATE INDEX idx_offers_active ON offers(is_active) WHERE is_active = TRUE;');

        // Уникальный индекс на активные предложения пара (продукт + магазин)
        DB::statement('CREATE UNIQUE INDEX idx_offers_unique_active ON offers(product_id, store_id) WHERE is_active = TRUE;');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('offers');
    }
};
