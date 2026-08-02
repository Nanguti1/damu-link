<?php

namespace App\Exceptions;

use Exception;

class InvalidDonationClaimException extends Exception
{
    public function __construct(string $message = 'Invalid donation claim.')
    {
        parent::__construct($message);
    }
}
