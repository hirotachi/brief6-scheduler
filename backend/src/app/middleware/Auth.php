<?php

namespace App\middleware;

use App\Core\Request;
use Symfony\Component\HttpFoundation\Response;

class Auth implements Middleware
{

    public function handle(Request $request, callable $next)
    {
        verifyAuthToken($request);
        $userId = $request->attributes->get("userId");
        if (!$userId) {
            return response(["error" => "Unauthorized"], Response::HTTP_UNAUTHORIZED);
        }
        return $next();
    }
}