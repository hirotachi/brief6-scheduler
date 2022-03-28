<?php

namespace App\models;

class Appointment extends Model
{
    protected string $table = "appointments";
    protected array $required = ["user_id", "date"];
}