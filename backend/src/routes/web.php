<?php


use App\controllers\UserController;
use App\Core\Route;

Route::get("/", function () {
    return "nice";
});


Route::post("/register", [UserController::class, "register"]);