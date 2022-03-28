<?php

namespace App\controllers;

use App\models\Appointment;

class AppointmentController
{

    private Appointment $model;

    public function __construct(Appointment $model)
    {
        $this->model = $model;
    }
}