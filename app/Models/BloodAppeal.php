<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class BloodAppeal extends Model
{
    protected $fillable = [
        'user_id',
        'hospital_id',
        'patient_initials',
        'blood_type',
        'pints_required',
        'pints_secured',
        'contact_phone',
        'verification_document_path',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'pints_required' => 'integer',
            'pints_secured' => 'integer',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function hospital(): BelongsTo
    {
        return $this->belongsTo(Hospital::class);
    }

    public function donationClaims(): HasMany
    {
        return $this->hasMany(DonationClaim::class);
    }
}
