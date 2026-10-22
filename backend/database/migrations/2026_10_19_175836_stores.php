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
        Schema::create('stores', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(DB::raw('gen_random_uuid()'));
            $table->string('name', 150);
            $table->string('brand', 100)->nullable();
            $table->string('address', 300)->nullable();
            $table->string('city', 100)->default('Klaipėda');
            $table->decimal('latitude', 10, 7);
            $table->decimal('longitude', 10, 7);
            $table->string('phone', 30)->nullable();
            $table->string('website', 255)->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestampsTz();

            $table->index('brand', 'idx_stores_brand');
        });

        // Создаем GiST индекс для ll_to_earth (PostgreSQL)
        DB::statement('CREATE INDEX idx_stores_location ON stores USING GIST (ll_to_earth(latitude, longitude));');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
