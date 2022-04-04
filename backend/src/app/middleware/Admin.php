<?php

namespace App\middleware;

use App\Core\Request;
use Symfony\Component\HttpFoundation\Response;

class Admin implements Middleware
{

    public function handle(Request $request, callable $next)
    {
        verifyAuthToken($request);
        $key = $request->attributes->get("key");
        if (config()->adminKey !== $key) {
            return response(["error" => "Unauthorized"], Response::HTTP_UNAUTHORIZED);
        }
        return $next();
    }
}