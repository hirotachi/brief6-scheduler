<?php

namespace App\core;

use Throwable;

class VerificationException extends \Exception
{

    private array $fields;

    public function __construct(string $message = "", int $code = 0, ?Throwable $previous = null, array $fields = [])
    {
        parent::__construct($message, $code, $previous);

        $this->fields = $fields;
    }

    /**
     * @return array
     */
    public function getFields(): array
    {
        return $this->fields;
    }

    
}