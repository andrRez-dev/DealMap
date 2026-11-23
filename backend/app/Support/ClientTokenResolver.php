<?php

namespace App\Support;

use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;

class ClientTokenResolver
{
    public function resolveUser(Request $request, bool $required): ?User
    {
        $plainTextToken = $request->header('X-Client-Token');

        if (! is_string($plainTextToken) || $plainTextToken === '') {
            abort_if($required, 401, 'A user access token is required.');

            return null;
        }

        $accessToken = PersonalAccessToken::query()
            ->with('tokenable')
            ->whereKey(explode('|', $plainTextToken, 2)[0])
            ->first();

        if (
            ! $accessToken ||
            ! hash_equals($accessToken->token, hash('sha256', explode('|', $plainTextToken, 2)[1] ?? ''))
        ) {
            abort(401, 'The user access token is invalid.');
        }

        $user = $accessToken->tokenable;

        abort_unless(
            $user instanceof User && $user->is_active,
            401,
            'The user access token is invalid.'
        );

        return $user;
    }
}