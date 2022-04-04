<?php


use App\controllers\AppointmentController;
use App\controllers\UserController;
use App\Core\Route;

Route::get("/", function () {
    return "nice";
});


Route::post("/register", [UserController::class, "register"]);

Route::post("/login", [
    UserController::class, "login",
]);


Route::get("/history", [AppointmentController::class, "history"])->middleware("auth");
