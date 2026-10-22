<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\ApiClient;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use RuntimeException;
use Tests\TestCase;

class VotesTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        if (DB::connection()->getDatabaseName() !== 'dealmap_test') {
            throw new RuntimeException(
                'Votes feature tests require the separate dealmap_test database. '
                .'Run them with: docker compose exec -e DB_DATABASE=dealmap_test backend php artisan test --filter=VotesTest'
            );
        }

        Schema::create('users', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password_hash');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('api_clients', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('personal_access_tokens', function (Blueprint $table): void {
            $table->id();
            $table->uuidMorphs('tokenable');
            $table->string('name');
            $table->string('token', 64)->unique();
            $table->text('abilities')->nullable();
            $table->timestamp('last_used_at')->nullable();
            $table->timestamp('expires_at')->nullable();
            $table->timestamps();
        });

        Schema::create('offers', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->uuid('product_id');
            $table->uuid('store_id');
            $table->decimal('original_price', 10, 2)->nullable();
            $table->decimal('discounted_price', 10, 2)->default(1);
            $table->smallInteger('discount_percent')->nullable();
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->date('starts_at')->nullable();
            $table->date('expires_at')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('products', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('unit')->default('kg');
        });

        Schema::create('stores', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('brand')->nullable();
            $table->string('address')->nullable();
            $table->string('city')->default('Klaipėda');
            $table->decimal('latitude', 10, 7)->default(55.7);
            $table->decimal('longitude', 10, 7)->default(21.1);
        });

        Schema::create('votes', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->uuid('offer_id');
            $table->uuid('user_id');
            $table->string('vote');
            $table->timestampTz('created_at');
            $table->unique(['offer_id', 'user_id']);
        });
    }

    protected function tearDown(): void
    {
        if (DB::connection()->getDatabaseName() === 'dealmap_test') {
            Schema::dropIfExists('votes');
            Schema::dropIfExists('personal_access_tokens');
            Schema::dropIfExists('offers');
            Schema::dropIfExists('products');
            Schema::dropIfExists('stores');
            Schema::dropIfExists('users');
            Schema::dropIfExists('api_clients');
        }

        parent::tearDown();
    }

    public function test_a_user_can_change_their_vote_without_creating_a_second_vote(): void
    {
        $offerId = $this->createOffer();
        $user = $this->createUser();

        $this->submitVote($user, $offerId, 'works')
            ->assertOk()
            ->assertJsonPath('votes.works', 1)
            ->assertJsonPath('votes.expired', 0);

        $this->submitVote($user, $offerId, 'expired')
            ->assertOk()
            ->assertJsonPath('votes.works', 0)
            ->assertJsonPath('votes.expired', 1);

        $this->submitVote($user, $offerId, 'works')
            ->assertOk()
            ->assertJsonPath('votes.works', 1)
            ->assertJsonPath('votes.expired', 0);

        $this->assertDatabaseCount('votes', 1);
        $this->assertDatabaseHas('votes', [
            'offer_id' => $offerId,
            'user_id' => $user->id,
            'vote' => 'works',
        ]);
    }

    public function test_three_expired_votes_deactivate_an_offer(): void
    {
        $offerId = $this->createOffer();

        foreach (range(1, 3) as $index) {
            $this->submitVote($this->createUser(), $offerId, 'expired')
                ->assertOk();
        }

        $this->assertDatabaseHas('offers', [
            'id' => $offerId,
            'is_active' => false,
        ]);
    }

    public function test_changing_an_expired_vote_reactivates_an_unexpired_offer_below_the_threshold(): void
    {
        $offerId = $this->createOffer();
        $users = collect(range(1, 3))->map(fn () => $this->createUser());

        foreach ($users as $user) {
            DB::table('votes')->insert([
                'id' => (string) Str::uuid(),
                'offer_id' => $offerId,
                'user_id' => $user->id,
                'vote' => 'expired',
                'created_at' => now(),
            ]);
        }

        DB::table('offers')->where('id', $offerId)->update(['is_active' => false]);

        $this->submitVote($users->first(), $offerId, 'works')
            ->assertOk()
            ->assertJsonPath('votes.expired', 2)
            ->assertJsonPath('is_active', true);

        $this->assertDatabaseHas('offers', [
            'id' => $offerId,
            'is_active' => true,
        ]);
    }

    public function test_an_expired_offer_stays_inactive_when_expired_votes_fall_below_the_threshold(): void
    {
        $offerId = $this->createOffer(today()->subDay()->toDateString(), false);
        $users = collect(range(1, 3))->map(fn () => $this->createUser());

        foreach ($users as $user) {
            DB::table('votes')->insert([
                'id' => (string) Str::uuid(),
                'offer_id' => $offerId,
                'user_id' => $user->id,
                'vote' => 'expired',
                'created_at' => now(),
            ]);
        }

        $this->submitVote($users->first(), $offerId, 'works')
            ->assertOk()
            ->assertJsonPath('votes.expired', 2)
            ->assertJsonPath('is_active', false);

        $this->assertDatabaseHas('offers', [
            'id' => $offerId,
            'is_active' => false,
        ]);
    }

    public function test_vote_requires_both_frontend_and_user_tokens(): void
    {
        $offerId = $this->createOffer();

        $this->postJson("/api/offers/{$offerId}/votes", ['vote' => 'works'])
            ->assertUnauthorized();

        $this->actingAs($this->createFrontendClient(), 'sanctum')
            ->postJson("/api/offers/{$offerId}/votes", ['vote' => 'works'])
            ->assertUnauthorized();
    }

    public function test_user_token_without_frontend_token_cannot_vote(): void
    {
        $offerId = $this->createOffer();
        $user = $this->createUser();

        $this->withHeader('X-Client-Token', $user->createToken('test-user')->plainTextToken)
            ->postJson("/api/offers/{$offerId}/votes", ['vote' => 'works'])
            ->assertUnauthorized();
    }

    public function test_vote_value_must_be_supported(): void
    {
        $offerId = $this->createOffer();

        $this->submitVote($this->createUser(), $offerId, 'maybe')
            ->assertUnprocessable()
            ->assertJsonValidationErrors('vote');
    }

    public function test_offer_list_includes_product_store_vote_counts_and_the_authenticated_users_vote(): void
    {
        $offerId = $this->createOffer();
        $user = $this->createUser();
        $this->createVote($offerId, $user->id, 'works');
        $this->createVote($offerId, $this->createUser()->id, 'expired');

        $this->actingAs($this->createFrontendClient(), 'sanctum')
            ->withHeader('X-Client-Token', $user->createToken('test-user')->plainTextToken)
            ->getJson('/api/offers')
            ->assertOk()
            ->assertJsonPath('0.product_name', 'Test product')
            ->assertJsonPath('0.product_unit', 'kg')
            ->assertJsonPath('0.store_name', 'Test store')
            ->assertJsonPath('0.store_city', 'Klaipėda')
            ->assertJsonPath('0.works_votes', 1)
            ->assertJsonPath('0.expired_votes', 1)
            ->assertJsonPath('0.my_vote', 'works');
    }

    public function test_frontend_client_can_view_offer_list_without_a_user_token(): void
    {
        $offerId = $this->createOffer();
        $this->createVote($offerId, $this->createUser()->id, 'expired');

        $this->actingAs($this->createFrontendClient(), 'sanctum')
            ->getJson('/api/offers')
            ->assertOk()
            ->assertJsonPath('0.id', $offerId)
            ->assertJsonPath('0.product_name', 'Test product')
            ->assertJsonPath('0.store_name', 'Test store')
            ->assertJsonPath('0.works_votes', 0)
            ->assertJsonPath('0.expired_votes', 1)
            ->assertJsonPath('0.my_vote', null);
    }

    public function test_offer_list_requires_a_frontend_token(): void
    {
        $this->getJson('/api/offers')->assertUnauthorized();
    }

    private function createOffer(?string $expiresAt = null, bool $isActive = true): string
    {
        $id = (string) Str::uuid();
        $productId = (string) Str::uuid();
        $storeId = (string) Str::uuid();

        DB::table('products')->insert([
            'id' => $productId,
            'name' => 'Test product',
            'unit' => 'kg',
        ]);

        DB::table('stores')->insert([
            'id' => $storeId,
            'name' => 'Test store',
            'brand' => 'Test brand',
            'address' => 'Test address',
            'city' => 'Klaipėda',
            'latitude' => 55.7,
            'longitude' => 21.1,
        ]);

        DB::table('offers')->insert([
            'id' => $id,
            'product_id' => $productId,
            'store_id' => $storeId,
            'original_price' => 2.00,
            'discounted_price' => 1.50,
            'discount_percent' => 25,
            'title' => 'Test offer',
            'description' => 'Test description',
            'starts_at' => today()->toDateString(),
            'expires_at' => $expiresAt,
            'is_active' => $isActive,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return $id;
    }

    private function createVote(string $offerId, string $userId, string $vote): void
    {
        DB::table('votes')->insert([
            'id' => (string) Str::uuid(),
            'offer_id' => $offerId,
            'user_id' => $userId,
            'vote' => $vote,
            'created_at' => now(),
        ]);
    }

    private function createUser(): User
    {
        $user = new User();
        $user->id = (string) Str::uuid();
        $user->name = fake()->name();
        $user->email = fake()->unique()->safeEmail();
        $user->password_hash = 'test-password';
        $user->is_active = true;
        $user->save();

        return $user;
    }

    private function createFrontendClient(): ApiClient
    {
        return ApiClient::create([
            'name' => 'Test frontend',
            'email' => fake()->unique()->safeEmail(),
            'password' => 'test-password',
        ]);
    }

    private function submitVote(User $user, string $offerId, string $vote)
    {
        return $this->actingAs($this->createFrontendClient(), 'sanctum')
            ->withHeader('X-Client-Token', $user->createToken('test-user')->plainTextToken)
            ->postJson("/api/offers/{$offerId}/votes", ['vote' => $vote]);
    }
}
