<?php

namespace App\Exceptions;

use Exception;

class AppealAlreadyVerifiedException extends Exception
{
    public function __construct()
    {
        parent::__construct('This blood appeal has already been verified.');
    }
}
