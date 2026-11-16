<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('offer_user', function (Blueprint $table) {
            $table->foreignUuid('user_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('offer_id')->constrained()->cascadeOnDelete();

            $table->primary(['user_id', 'offer_id']);
            $table->index('offer_id', 'idx_offer_user_offer');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('offer_user');
    }
};
