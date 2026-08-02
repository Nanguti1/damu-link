<?php

namespace App\Exceptions;

use Exception;

class InactiveDonorException extends Exception
{
    public function __construct()
    {
        parent::__construct('This donor is not active and cannot make donation claims.');
    }
}
