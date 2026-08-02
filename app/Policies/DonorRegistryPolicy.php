<?php

namespace App\Policies;

use App\Models\DonorRegistry;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class DonorRegistryPolicy
{
    use HandlesAuthorization;

    public function view(User $user, DonorRegistry $donor): bool
    {
        return $user->id === $donor->user_id || $user->hasRole('admin');
    }

    public function viewAny(User $user): bool
    {
        return $user->hasRole('admin') || $user->hasRole('hospital_admin');
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, DonorRegistry $donor): bool
    {
        return $user->id === $donor->user_id || $user->hasRole('admin');
    }

    public function delete(User $user, DonorRegistry $donor): bool
    {
        return $user->id === $donor->user_id || $user->hasRole('admin');
    }

    public function activate(User $user, DonorRegistry $donor): bool
    {
        return $user->id === $donor->user_id || $user->hasRole('admin');
    }

    public function deactivate(User $user, DonorRegistry $donor): bool
    {
        return $user->id === $donor->user_id || $user->hasRole('admin');
    }
}
