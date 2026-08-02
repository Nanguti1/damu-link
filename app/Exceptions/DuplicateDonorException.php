<?php

namespace App\Exceptions;

use Exception;

class DuplicateDonorException extends Exception
{
    public function __construct()
    {
        parent::__construct('A donor with this user or phone number already exists.');
    }
}
