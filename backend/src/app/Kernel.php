<?php

namespace App;

use App\Core\Request;
use App\Core\Route;
use Symfony\Component\HttpFoundation\Response;

class Kernel
{

    public function handle(Request $request): Response
    {
        return Route::handle($request);
    }

    public function cors()
    {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Cookie');
        header("Access-Control-Allow-Credentials: true");
    }
}