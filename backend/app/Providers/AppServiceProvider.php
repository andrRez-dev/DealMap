<?php

namespace App\Providers;

use Dedoc\Scramble\Scramble;
use Dedoc\Scramble\Support\Generator\Operation;
use Dedoc\Scramble\Support\Generator\Parameter;
use Dedoc\Scramble\Support\Generator\Schema;
use Dedoc\Scramble\Support\Generator\Types\StringType;
use Dedoc\Scramble\Support\RouteInfo;
use Illuminate\Support\ServiceProvider;

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

                $operation->parameters[] = (new Parameter(
                    name: 'X-Client-Token',
                    in: 'header'
                ))
                    ->description('Identification for user access.')
                    ->setSchema(Schema::fromType(new StringType()));
                
            });
    }
}
