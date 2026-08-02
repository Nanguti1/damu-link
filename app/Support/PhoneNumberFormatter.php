<?php

namespace App\Support;

class PhoneNumberFormatter
{
    public static function format(string $phoneNumber): string
    {
        $cleaned = preg_replace('/[^0-9]/', '', $phoneNumber);

        if (str_starts_with($cleaned, '0') && strlen($cleaned) === 10) {
            return '+254' . substr($cleaned, 1);
        }

        if (str_starts_with($cleaned, '254') && strlen($cleaned) === 12) {
            return '+' . $cleaned;
        }

        if (str_starts_with($cleaned, '+254') && strlen($cleaned) === 13) {
            return $cleaned;
        }

        return $cleaned;
    }

    public static function normalize(string $phoneNumber): string
    {
        return self::format($phoneNumber);
    }

    public static function isValidKenyanNumber(string $phoneNumber): bool
    {
        $cleaned = preg_replace('/[^0-9]/', '', $phoneNumber);

        return (bool) preg_match('/^(254|0)?[17]\d{8}$/', $cleaned);
    }
}
