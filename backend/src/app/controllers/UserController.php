<?php

namespace App\controllers;

use App\Core\Request;
use App\models\User;
use Symfony\Component\HttpFoundation\Response;

class UserController
{

    private User $model;

    public function __construct(User $model)
    {
        $this->model = $model;
    }

    public function me(Request $req)
    {
        $userId = $req->attributes->get("userId");
        if ($userId === 0) {
            return ["id" => 0, "firstName" => "admin", "lastName" => "admin", "role" => "admin"];
        }
        return $this->model->findByID($userId);
    }

    public function all(Request $req)
    {
        $query = "";
        $placeholders = [];
        $search = $req->query->get("q");
        if ($search) {
            $query = "where firstName like :search or lastName like :search";
            $placeholders = ["search" => "%$search%"];
        }
        $users = $this->model->findAll($query, $placeholders);
        return $users;
    }

    public function update(Request $req)
    {
        $id = $req->attributes->get("id");
        if (!$id || !($user = $this->model->findByID($id))) {
            return response(["error" => "user not found"], Response::HTTP_NOT_FOUND);
        }
        $updated = $this->model->updateByID($id, $req->getBody());
        if (!$updated) {
            return response(["error" => "update not successful"], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        return ["message" => "success"];
    }

    public function delete(Request $req)
    {
        $id = $req->attributes->get("id");
        if (!$id || !($user = $this->model->findByID($id))) {
            return response(["error" => "user not found"], Response::HTTP_NOT_FOUND);
        }
        $deleted = $this->model->deleteByID($id);
        if (!$deleted) {
            return response(["error" => "deletion not successful"], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        return ["message" => "success"];
    }
}