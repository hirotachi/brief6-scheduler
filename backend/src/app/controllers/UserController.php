<?php

namespace App\controllers;

use App\models\User;

class UserController
{

    private User $model;

    public function __construct(User $model)
    {
        $this->model = $model;
    }
}