<?php


use App\controllers\AuthController;
use App\Core\Route;

Route::post("/register", [AuthController::class, "register"]);

Route::post("/login", [
    AuthController::class, "login",
]);
