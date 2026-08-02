<?php

namespace App\Actions\BloodAppeals;

use App\Models\BloodAppeal;

class CreateBloodAppealAction
{
    public function execute(array $data): BloodAppeal
    {
        return BloodAppeal::create([
            'user_id' => $data['user_id'],
            'hospital_id' => $data['hospital_id'],
            'patient_initials' => $data['patient_initials'],
            'blood_type' => $data['blood_type'],
            'pints_required' => $data['pints_required'],
            'pints_secured' => 0,
            'contact_phone' => $data['contact_phone'],
            'verification_document_path' => $data['verification_document_path'] ?? null,
            'status' => 'pending_verification',
        ]);
    }
}
