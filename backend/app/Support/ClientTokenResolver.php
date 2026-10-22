<?php

namespace App\Support;

use App\Models\ApiClient;
use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;

class ClientTokenResolver
{
    public function requireFrontendClient(Request $request): ApiClient
    {
        $client = $request->user('sanctum');

        abort_unless($client instanceof ApiClient, 401, 'A frontend access token is required.');

        return $client;
    }

    public function resolveUser(Request $request, bool $required): ?User
    {
        $plainTextToken = $request->header('X-Client-Token');

        if (! is_string($plainTextToken) || $plainTextToken === '') {
            abort_if($required, 401, 'A user access token is required.');

            return null;
        }

        $accessToken = PersonalAccessToken::findToken($plainTextToken);
        $user = $accessToken?->tokenable;

        abort_unless($user instanceof User && $user->is_active, 401, 'The user access token is invalid.');

        return $user;
    }
}
