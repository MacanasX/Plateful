<?php

namespace App\DTOs;

use Illuminate\Support\Collection;

class MealDbResponse
{
    protected bool $success;
    protected string $rootKey = 'meals';
    protected ?Collection $data;
    protected ?string $error;
    protected ?int $errorCode;


    public function __construct(bool $success, mixed $data = null, string $error = null, int $errorCode = null)
    {
        $this->success = $success;
        $this->data = $data === null ? null : collect($data);
        $this->error = $error;
        $this->errorCode = $errorCode;
    }

    public function isSuccess(): bool
    {
        return $this->success;
    }

    public function getData(): ?Collection
    {

        if (is_null($this->data)) {
            return null;
        }

        return collect(data_get($this->data, $this->rootKey));
    }

    public function getError(): ?string
    {
        return $this->error;
    }

    public function getErrorCode(): ?int
    {
        return $this->errorCode;
    }

    public function setRootKey(string $rootKey): self
    {
        $this->rootKey = $rootKey;
        return $this;
    }

    public static function success(mixed $data): self
    {
        return new self(true, $data);
    }

    public static function error(string $message, ?int $code = null): self
    {
        return new self(false, null, $message, $code);
    }
}
