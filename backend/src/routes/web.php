<?php


use App\controllers\AppointmentController;
use App\controllers\UserController;
use App\Core\Route;

Route::get("/", function () {
    return "welcome to api";
});

Route::get("/me", [UserController::class, "me"])->middleware("auth");
Route::get("/history", [AppointmentController::class, "history"])->middleware("auth");
