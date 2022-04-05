<?php


use App\Core\Route;
use App\middleware\Admin;
use App\middleware\Auth;

Route::middleware(Auth::class, "auth");
Route::middleware(Admin::class, "admin");