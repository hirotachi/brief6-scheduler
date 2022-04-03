<?php

namespace App\models;

class User extends Model
{
    protected string $table = "users";
    protected array $required = ["lastName", "firstName", "profession", "birthdate", "authKey"];


    public function findByKey(string $key)
    {
        return $this->findOne("authKey = :key", ["key" => $key]);
    }

}