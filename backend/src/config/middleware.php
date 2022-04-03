<?php


use App\Core\Route;
use App\middleware\Auth;

Route::middleware(Auth::class, "auth");