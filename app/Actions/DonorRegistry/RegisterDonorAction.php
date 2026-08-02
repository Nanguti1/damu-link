<?php

namespace App\Actions\DonorRegistry;

use App\Exceptions\DuplicateDonorException;
use App\Models\DonorRegistry;
use Illuminate\Support\Facades\DB;

class RegisterDonorAction
{
    public function execute(array $data): DonorRegistry
    {
        return DB::transaction(function () use ($data) {
            $userId = $data['user_id'] ?? null;
            $phoneNumber = $data['phone_number'] ?? null;

            if (!$userId && !$phoneNumber) {
                throw new \InvalidArgumentException('Either user_id or phone_number must be provided.');
            }

            if ($userId) {
                $existing = DonorRegistry::where('user_id', $userId)->exists();
                if ($existing) {
                    throw new DuplicateDonorException();
                }
            }

            if ($phoneNumber) {
                $existing = DonorRegistry::where('phone_number', $phoneNumber)->exists();
                if ($existing) {
                    throw new DuplicateDonorException();
                }
            }

            return DonorRegistry::create([
                'user_id' => $userId,
                'phone_number' => $phoneNumber,
                'blood_type' => $data['blood_type'],
                'county' => $data['county'],
                'sub_county' => $data['sub_county'],
                'is_active' => true,
            ]);
        });
    }
}
