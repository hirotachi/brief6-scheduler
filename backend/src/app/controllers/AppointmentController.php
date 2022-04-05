<?php

namespace App\controllers;

use App\Core\Request;
use App\core\VerificationException;
use App\models\Appointment;
use Symfony\Component\HttpFoundation\Response;

class AppointmentController
{

    private Appointment $model;

    public function __construct(Appointment $model)
    {
        $this->model = $model;
    }


    public function all(Request $req)
    {
        return $this->model->findAll();
    }

    public function history(Request $req)
    {
        $userId = $req->attributes->get("userId");
        return $this->model->findAllByUserId($userId);
    }

    public function create(Request $req)
    {
        try {
            $body = $req->getBody();
            $exists = $this->model->findOne("date = :date and slot = :slot",
                ["date" => $body["date"], "slot" => $body["slot"]]);
            if ($exists) {
                return response(["error" => "appointment already booked try another slot"], Response::HTTP_CONFLICT);
            }
            $id = $this->model->create([...$body, "user_id" => $req->attributes->get("userId")]);
            return [...$body, "id" => $id];
        } catch (VerificationException $e) {
            return response(["error" => "required fields not filled", "fields" => $e->getFields()],
                Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    public function update(Request $req)
    {
        $body = $req->getBody();
        $userId = $req->attributes->get("userId");
        $id = $req->attributes->get("id");
        $appointment = $this->model->findByID($id);
        if (!$appointment) {
            return response(["error" => "appointment doesnt exist"], Response::HTTP_NOT_FOUND);
        }
        if ($appointment->user_id !== $userId) {
            return response(["error" => "Unauthorized"], Response::HTTP_UNAUTHORIZED);
        }
        $updated = $this->model->updateByID($id, $body);
        if (!$updated) {
            return response(["error" => "error failed update"], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        return ["message" => "success"];
    }

    public function delete(Request $req)
    {
        $userId = $req->attributes->get("userId");
        $id = $req->attributes->get("id");
        $appointment = $this->model->findByID($id);
        if (!$appointment) {
            return response(["error" => "appointment doesnt exist"], Response::HTTP_NOT_FOUND);
        }
        if ($appointment->user_id !== $userId) {
            return response(["error" => "Unauthorized"], Response::HTTP_UNAUTHORIZED);
        }
        $deleted = $this->model->deleteByID($id);
        if (!$deleted) {
            return response(["error" => "error failed deletion"], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        return ["message" => "deleted"];
    }
}