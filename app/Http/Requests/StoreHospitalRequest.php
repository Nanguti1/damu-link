<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreHospitalRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'county' => ['required', 'string', 'max:100'],
            'sub_county' => ['required', 'string', 'max:100'],
            'total_icu_beds' => ['nullable', 'integer', 'min:0'],
            'available_icu_beds' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
