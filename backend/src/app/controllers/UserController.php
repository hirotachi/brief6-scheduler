<?php

namespace App\controllers;

use App\Core\Request;
use App\core\VerificationException;
use App\models\User;
use Symfony\Component\HttpFoundation\Response;

class UserController
{

    private User $model;

    public function __construct(User $model)
    {
        $this->model = $model;
    }

    public function register(Request $req)
    {
        $key = uniqid();
        $data = [...$req->getBody(), "authKey" => $key];
        try {
            $id = $this->model->create($data);
        } catch (VerificationException $e) {
            return response(["message" => "Please fill the required fields", "fields" => $e->getFields()],
                Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        $user = (object) [...$data, "id" => $id];
        return response(["message" => "success", "key" => $key, "token" => generateToken($user)]);
    }

    public function login(Request $req)
    {
        $obj = $req->getBodyAsObject();

        if (!isset($obj->key)) {
            return response(["message" => "Please fill the required fields", "fields" => ["key"]],
                Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        if ($obj->key === config()->adminKey) {
            return response([
                "message" => "success", "isAdmin" => true,
                "token" => generateToken((object) ["authKey" => $obj->key, "id" => 0])
            ]);
        }
        $user = $this->model->findByKey($obj->key);
        if (!$user) {
            return response(["message" => "wrong personal key"], Response::HTTP_FORBIDDEN);
        }

        return response(["message" => "success", "token" => generateToken($user)]);
    }
}