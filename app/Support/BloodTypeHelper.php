<?php

namespace App\Support;

class BloodTypeHelper
{
    public const BLOOD_TYPES = [
        'A+',
        'A-',
        'B+',
        'B-',
        'AB+',
        'AB-',
        'O+',
        'O-',
    ];

    public static function getAll(): array
    {
        return self::BLOOD_TYPES;
    }

    public static function isValid(string $bloodType): bool
    {
        return in_array($bloodType, self::BLOOD_TYPES, true);
    }

    public static function getCompatibleTypes(string $bloodType): array
    {
        return match ($bloodType) {
            'O-' => ['O-'],
            'O+' => ['O+', 'O-'],
            'A-' => ['A-', 'O-'],
            'A+' => ['A+', 'A-', 'O+', 'O-'],
            'B-' => ['B-', 'O-'],
            'B+' => ['B+', 'B-', 'O+', 'O-'],
            'AB-' => ['AB-', 'A-', 'B-', 'O-'],
            'AB+' => ['AB+', 'AB-', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-'],
            default => [],
        };
    }

    public static function canDonateTo(string $donorType, string $recipientType): bool
    {
        return in_array($recipientType, self::getCompatibleTypes($donorType), true);
    }
}
