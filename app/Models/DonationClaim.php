<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DonationClaim extends Model
{
    protected $fillable = [
        'blood_appeal_id',
        'donor_registry_id',
        'expires_at',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'expires_at' => 'datetime',
        ];
    }

    public function bloodAppeal(): BelongsTo
    {
        return $this->belongsTo(BloodAppeal::class);
    }

    public function donorRegistry(): BelongsTo
    {
        return $this->belongsTo(DonorRegistry::class);
    }
}
