<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RegisterDonorRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'phone_number' => ['nullable', 'string', 'max:20', 'unique:donor_registry,phone_number'],
            'blood_type' => ['required', Rule::in(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])],
            'county' => ['required', 'string', 'max:100'],
            'sub_county' => ['required', 'string', 'max:100'],
            'consent' => ['accepted'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'user_id.required_without' => 'Either user_id or phone_number must be provided.',
            'phone_number.required_without' => 'Either user_id or phone_number must be provided.',
        ];
    }

    /**
     * Configure the validator instance.
     */
    public function after(): array
    {
        return [
            function ($validator) {
                if (!$this->input('user_id') && !$this->input('phone_number')) {
                    $validator->errors()->add('user_id', 'Either user_id or phone_number must be provided.');
                    $validator->errors()->add('phone_number', 'Either user_id or phone_number must be provided.');
                }
            },
        ];
    }
}
