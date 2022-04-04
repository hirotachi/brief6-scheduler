<?php


use App\controllers\AppointmentController;
use App\Core\Route;

Route::get("/", function () {
    return "welcome to api";
});


Route::get("/history", [AppointmentController::class, "history"])->middleware("auth");
