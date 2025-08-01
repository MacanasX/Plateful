<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class FavoritesRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'ids' => 'array',
            'ids.*' => 'string',
        ];
    }

    public function prepareForValidation()
    {
        $ids = $this->input('ids');

        if (is_string($ids)) {
            $ids = array_filter(array_map('trim', explode(',', $ids)));
            $this->merge(['ids' => $ids]);
        }

        if (!$this->has('ids') || !is_array($ids)) {
            $this->merge(['ids' => []]);
        }
    }
}
