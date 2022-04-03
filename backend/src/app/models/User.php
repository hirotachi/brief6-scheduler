<?php

namespace App\models;

class User extends Model
{
    protected string $table = "users";
    protected array $required = ["lastName", "firstName", "profession", "birthdate", "authKey"];


}