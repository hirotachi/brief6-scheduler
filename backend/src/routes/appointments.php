<?php


use App\controllers\AppointmentController;
use App\Core\Route;


Route::post("/", [AppointmentController::class, "create"])->middleware("auth");
Route::put("/{id}", [AppointmentController::class, "update"])->middleware("auth");
Route::delete("/{id}", [AppointmentController::class, "delete"])->middleware("auth");
