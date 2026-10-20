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
        Schema::create('votes', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(DB::raw('gen_random_uuid()'));

            $table->foreignUuid('offer_id')->constrained('offers')->cascadeOnDelete();
            $table->foreignUuid('user_id')->constrained('api_clients')->cascadeOnDelete();

            // Встроенный метод Laravel enum
            $table->enum('vote', ['works', 'expired']);

            $table->timestampTz('created_at')->default(DB::raw('NOW()'));

            $table->unique(['offer_id', 'user_id']);
            $table->index('offer_id', 'idx_votes_offer');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('votes');
        DB::statement('DROP TYPE IF EXISTS vote_type;');
    }
};
