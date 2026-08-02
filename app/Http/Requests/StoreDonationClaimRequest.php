<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreDonationClaimRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'blood_appeal_id' => ['required', 'exists:blood_appeals,id'],
            'donor_registry_id' => ['required', 'exists:donor_registry,id'],
        ];
    }
}
