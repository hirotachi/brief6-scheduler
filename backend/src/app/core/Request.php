<?php

namespace App\Core;

use Symfony\Component\HttpFoundation\Request as SymfonyRequest;

class Request extends SymfonyRequest
{
    static function capture(): self
    {
        $request = self::createFromGlobals();
        $spoofedMethodKey = "_method";
        $method = $request->request->get($spoofedMethodKey);
        if ($method) {
            $request->setMethod(strtolower($method));
            $request->request->remove($spoofedMethodKey);
        }
        return $request;
    }

    public function getBody(): array
    {
        $isJSON = $this->headers->get("content-type") === "application/json";
        if ($isJSON) {
            return (array) json_decode(file_get_contents('php://input'));
        }
        return $this->request->all();
    }

    public function getBodyAsObject(): object
    {
        return (object) $this->getBody();
    }

    public function getReferer(): ?string
    {
        return $this->headers->get("referer");
    }
}