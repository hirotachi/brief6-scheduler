<?php

namespace App\controllers;

use App\Core\Request;
use App\models\User;

class UserController
{

    private User $model;

    public function __construct(User $model)
    {
        $this->model = $model;
    }

    public function register(Request $req)
    {
        echo "nicer than ever";
    }
}