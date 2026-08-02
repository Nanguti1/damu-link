<?php

namespace App\Policies;

use App\Models\Hospital;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class HospitalPolicy
{
    use HandlesAuthorization;

    public function view(User $user, Hospital $hospital): bool
    {
        return true;
    }

    public function viewAny(User $user): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return $user->hasRole('admin') || $user->hasRole('hospital_admin');
    }

    public function update(User $user, Hospital $hospital): bool
    {
        return $user->hasRole('admin') || $user->hasRole('hospital_admin');
    }

    public function delete(User $user, Hospital $hospital): bool
    {
        return $user->hasRole('admin');
    }
}
