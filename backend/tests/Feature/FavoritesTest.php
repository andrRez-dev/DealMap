<?php

namespace Tests\Feature;

use App\Models\ApiClient;
use App\Models\Offer;
use App\Models\Product;
use App\Models\Store;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Tests\TestCase;

class FavoritesTest extends TestCase
{
    use RefreshDatabase;

    public function test_a_user_can_add_and_remove_a_favorite_offer(): void
    {
        $user = $this->createUser();
        $offer = $this->createOffer();

        $this->authorizedAs($user)
            ->postJson('/api/favorites/'.$offer->id)
            ->assertOk()
            ->assertJsonPath('is_favorite', true);

        $this->authorizedAs($user)
            ->postJson('/api/favorites/'.$offer->id)
            ->assertOk();

        $this->assertDatabaseCount('offer_user', 1);
        $this->assertDatabaseHas('offer_user', [
            'user_id' => $user->id,
            'offer_id' => $offer->id,
        ]);

        $this->authorizedAs($user)
            ->deleteJson('/api/favorites/'.$offer->id)
            ->assertOk()
            ->assertJsonPath('is_favorite', false);

        $this->authorizedAs($user)
            ->deleteJson('/api/favorites/'.$offer->id)
            ->assertOk()
            ->assertJsonPath('is_favorite', false);

        $this->assertDatabaseCount('offer_user', 0);
    }

    public function test_favorites_list_is_paginated_and_hides_inactive_and_expired_offers(): void
    {
        $user = $this->createUser();
        $otherUser = $this->createUser();
        $favorite = $this->createOffer();
        $favorite->load(['product', 'store']);
        $inactive = $this->createOffer(isActive: false);
        $expired = $this->createOffer(expiresAt: today()->subDay()->toDateString());
        $upcoming = $this->createOffer(
            expiresAt: today()->addDays(3)->toDateString(),
            startsAt: today()->addDay()->toDateString(),
        );
        $expiresToday = $this->createOffer(expiresAt: today()->toDateString());
        $notFavorite = $this->createOffer();

        $user->favoriteOffers()->attach([
            $favorite->id,
            $inactive->id,
            $expired->id,
            $upcoming->id,
            $expiresToday->id,
        ]);
        $otherUser->favoriteOffers()->attach($notFavorite->id);

        $response = $this->authorizedAs($user)
            ->getJson('/api/favorites')
            ->assertOk()
            ->assertJsonCount(3, 'data')
            ->assertJsonPath('data.0.id', $upcoming->id)
            ->assertJsonPath('data.1.id', $expiresToday->id)
            ->assertJsonPath('data.2.id', $favorite->id)
            ->assertJsonPath('data.2.product_name', $favorite->product->name)
            ->assertJsonPath('data.2.store_name', $favorite->store->name)
            ->assertJsonPath('meta.per_page', 20)
            ->assertJsonPath('meta.total', 3)
            ->assertJsonStructure([
                'data' => [[
                    'id',
                    'discounted_price',
                    'product_name',
                    'product_unit',
                    'store_name',
                    'store_city',
                    'works_votes',
                    'expired_votes',
                    'my_vote',
                ]],
                'links' => ['first', 'last', 'prev', 'next'],
                'meta' => ['current_page', 'last_page', 'per_page', 'total'],
            ]);

        $this->assertDatabaseCount('offer_user', 6);
        $this->assertSame(3, count($response->json('data')));
    }

    public function test_a_user_can_favorite_an_upcoming_offer_but_not_inactive_or_expired_offers(): void
    {
        $user = $this->createUser();
        $inactive = $this->createOffer(isActive: false);
        $expired = $this->createOffer(expiresAt: today()->subDay()->toDateString());
        $upcoming = $this->createOffer(
            expiresAt: today()->addDays(5)->toDateString(),
            startsAt: today()->addDays(2)->toDateString(),
        );

        $this->authorizedAs($user)
            ->postJson('/api/favorites/'.$inactive->id)
            ->assertUnprocessable();
        $this->authorizedAs($user)
            ->postJson('/api/favorites/'.$expired->id)
            ->assertUnprocessable();

        $this->authorizedAs($user)
            ->postJson('/api/favorites/'.$upcoming->id)
            ->assertOk()
            ->assertJsonPath('is_favorite', true);

        $this->authorizedAs($user)
            ->getJson('/api/favorites')
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.id', $upcoming->id);
    }

    public function test_favorite_ids_include_hidden_favorites_and_are_scoped_to_the_user(): void
    {
        $user = $this->createUser();
        $otherUser = $this->createUser();
        $active = $this->createOffer();
        $expired = $this->createOffer(expiresAt: today()->subDay()->toDateString());
        $otherUsersFavorite = $this->createOffer();

        $user->favoriteOffers()->attach([$active->id, $expired->id]);
        $otherUser->favoriteOffers()->attach($otherUsersFavorite->id);

        $response = $this->authorizedAs($user)
            ->getJson('/api/favorites/ids')
            ->assertOk()
            ->assertJsonCount(2, 'offer_ids');

        $this->assertEqualsCanonicalizing(
            [$active->id, $expired->id],
            $response->json('offer_ids'),
        );
    }

    public function test_favorite_list_supports_pagination(): void
    {
        $user = $this->createUser();
        $offerIds = collect(range(1, 21))
            ->map(fn () => $this->createOffer()->id);
        $user->favoriteOffers()->attach($offerIds->all());

        $this->authorizedAs($user)
            ->getJson('/api/favorites?page=2')
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('meta.current_page', 2)
            ->assertJsonPath('meta.per_page', 20)
            ->assertJsonPath('meta.total', 21);
    }

    public function test_favorite_endpoints_require_frontend_and_user_tokens(): void
    {
        $offer = $this->createOffer();
        $client = ApiClient::create([
            'name' => 'Test frontend',
            'email' => fake()->unique()->safeEmail(),
            'password' => 'test-password',
        ]);

        $this->getJson('/api/favorites')->assertUnauthorized();
        $this->getJson('/api/favorites/ids')->assertUnauthorized();
        $this->postJson('/api/favorites/'.$offer->id)->assertUnauthorized();
        $this->deleteJson('/api/favorites/'.$offer->id)->assertUnauthorized();

        $this->actingAs($client, 'sanctum')
            ->getJson('/api/favorites')
            ->assertUnauthorized();

        $this->actingAs($client, 'sanctum')
            ->getJson('/api/favorites/ids')
            ->assertUnauthorized();

        $this->actingAs($client, 'sanctum')
            ->postJson('/api/favorites/'.$offer->id)
            ->assertUnauthorized();

        $this->actingAs($client, 'sanctum')
            ->deleteJson('/api/favorites/'.$offer->id)
            ->assertUnauthorized();
    }

    public function test_favorite_endpoints_validate_offer_ids(): void
    {
        $user = $this->createUser();

        $this->authorizedAs($user)
            ->postJson('/api/favorites/not-a-uuid')
            ->assertUnprocessable()
            ->assertJsonValidationErrors('offer_id');

        $this->authorizedAs($user)
            ->postJson('/api/favorites/'.Str::uuid())
            ->assertNotFound();

        $this->authorizedAs($user)
            ->deleteJson('/api/favorites/'.Str::uuid())
            ->assertNotFound();
    }

    private function createOffer(
        ?string $expiresAt = null,
        bool $isActive = true,
        ?string $startsAt = null
    ): Offer {
        $categoryId = DB::table('categories')->insertGetId([
            'name' => 'Test category',
            'slug' => Str::uuid()->toString(),
            'is_active' => true,
        ]);

        $product = Product::create([
            'category_id' => $categoryId,
            'name' => 'Test product',
            'unit' => 'kg',
        ]);

        $store = Store::create([
            'name' => 'Test store',
            'city' => 'Klaipėda',
            'latitude' => 55.7,
            'longitude' => 21.1,
        ]);

        return Offer::create([
            'product_id' => $product->id,
            'store_id' => $store->id,
            'user_id' => $this->createUser()->id,
            'original_price' => 2.00,
            'discounted_price' => 1.50,
            'discount_percent' => 25,
            'starts_at' => $startsAt ?? today()->toDateString(),
            'expires_at' => $expiresAt,
            'is_active' => $isActive,
        ]);
    }

    private function createUser(): User
    {
        $user = new User;
        $user->id = (string) Str::uuid();
        $user->name = fake()->name();
        $user->email = fake()->unique()->safeEmail();
        $user->password_hash = 'test-password';
        $user->is_active = true;
        $user->save();

        return $user;
    }

    private function authorizedAs(User $user): self
    {
        $client = ApiClient::create([
            'name' => 'Test frontend',
            'email' => fake()->unique()->safeEmail(),
            'password' => 'test-password',
        ]);

        return $this->actingAs($client, 'sanctum')
            ->withHeader('X-Client-Token', $user->createToken('test-user')->plainTextToken);
    }
}
