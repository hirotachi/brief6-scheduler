<?php


use App\controllers\UserController;
use App\Core\Route;

Route::get("/", function () {
    return "nice";
})->middleware("auth");


Route::post("/register", [UserController::class, "register"]);

Route::post("/login", [
    UserController::class, "login",
]);