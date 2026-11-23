<?php

namespace App\Providers;

use Dedoc\Scramble\Scramble;
use Dedoc\Scramble\Support\Generator\Operation;
use Dedoc\Scramble\Support\Generator\Parameter;
use Dedoc\Scramble\Support\Generator\Schema;
use Dedoc\Scramble\Support\Generator\Types\StringType;
use Dedoc\Scramble\Support\RouteInfo;
use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\URL;
use Illuminate\Database\Eloquent\Model;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Model::preventLazyLoading(! app()->isProduction());

        Scramble::configure()
            ->withOperationTransformers(function (Operation $operation, RouteInfo $routeInfo) {
                $operation->parameters[] = (new Parameter(
                    name: 'Authorization',
                    in: 'header'
                ))
                    ->description('Identification for frontend. Use "Bearer " at the beginning')
                    ->setSchema(Schema::fromType(new StringType()));
                if (
                    $routeInfo->route->uri() === 'api/user/verify'
                    && $routeInfo->route->methods()[0] === 'POST'
                    || $routeInfo->route->uri() == 'api/user' && $routeInfo->route->methods()[0] === 'POST'
                ) {
                    return;
                }
                else if($routeInfo->route->uri() === 'api/user/reset-password'
                    && $routeInfo->route->methods()[0] === 'GET'
                    || $routeInfo->route->uri() == 'api/user/reset-password' && $routeInfo->route->methods()[0] === 'POST'
                ) {
                    return;
                }
                else if($routeInfo->route->uri() === 'api/user/email/verify'
                    && $routeInfo->route->methods()[0] === 'GET'
                    || $routeInfo->route->uri() == 'api/user/change-email' && $routeInfo->route->methods()[0] === 'GET'
                ) {
                    return;
                }

                $operation->parameters[] = (new Parameter(
                    name: 'X-Client-Token',
                    in: 'header'
                ))
                    ->description('Identification for user access.')
                    ->setSchema(Schema::fromType(new StringType()));
                
            });

            ResetPassword::createUrlUsing(function (object $notifiable, string $token) {
                return config('app.frontend_url') . '/reset-password?token=' . $token . '&email=' . urlencode($notifiable->getEmailForPasswordReset());
            });

            VerifyEmail::createUrlUsing(function (object $notifiable){
                $signedUrl = URL::temporarySignedRoute(
                    'verification.verify',
                    Carbon::now()->addMinutes(Config::get('auth.verification.expire', 60)),
                    [
                        'id' => $notifiable->getKey(),
                        'hash' => sha1($notifiable->getEmailForVerification()),
                    ]
                );

                $parsedUrl = parse_url($signedUrl);
                $frontendUrl = config('app.frontend_url');

                return $frontendUrl . '/user/email/verify?' . $parsedUrl['query'];
            });
    }
}
