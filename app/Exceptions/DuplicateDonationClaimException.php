<?php

namespace App\Exceptions;

use Exception;

class DuplicateDonationClaimException extends Exception
{
    public function __construct()
    {
        parent::__construct('A donation claim for this donor and appeal already exists.');
    }
}
