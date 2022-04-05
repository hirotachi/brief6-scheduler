<?php


use App\controllers\UserController;
use App\Core\Route;

Route::get("/", [UserController::class, "all"])->middleware("admin");
Route::delete("/{id}", [UserController::class, "delete"])->middleware("admin");
Route::put("/{id}", [
    UserController::class, "update",
])->middleware("admin");
