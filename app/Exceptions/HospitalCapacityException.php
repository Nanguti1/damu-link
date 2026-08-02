<?php

namespace App\Exceptions;

use Exception;

class HospitalCapacityException extends Exception
{
    public function __construct(string $message = 'Hospital capacity cannot be exceeded.')
    {
        parent::__construct($message);
    }
}
