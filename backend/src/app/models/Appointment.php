<?php

namespace App\models;

class Appointment extends Model
{
    protected string $table = "appointments";
    protected array $required = ["user_id", "date", "slot", "subject"];


    public function findAllByUserId($id): bool|array
    {
        return $this->findAll("where user_id = :user", ["user" => $id]);
    }
}