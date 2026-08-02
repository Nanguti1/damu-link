<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Hospital extends Model
{
    protected $fillable = [
        'name',
        'county',
        'sub_county',
        'total_icu_beds',
        'available_icu_beds',
    ];

    public function bloodAppeals(): HasMany
    {
        return $this->hasMany(BloodAppeal::class);
    }
}
