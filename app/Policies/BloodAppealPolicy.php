<?php

namespace App\Policies;

use App\Models\BloodAppeal;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class BloodAppealPolicy
{
    use HandlesAuthorization;

    public function view(User $user, BloodAppeal $appeal): bool
    {
        return true;
    }

    public function viewAny(User $user): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, BloodAppeal $appeal): bool
    {
        return $user->id === $appeal->user_id || $user->hasRole('admin');
    }

    public function delete(User $user, BloodAppeal $appeal): bool
    {
        return $user->id === $appeal->user_id || $user->hasRole('admin');
    }

    public function verify(User $user, BloodAppeal $appeal): bool
    {
        return $user->hasRole('admin') || $user->hasRole('hospital_admin');
    }

    public function fulfill(User $user, BloodAppeal $appeal): bool
    {
        return $user->hasRole('admin') || $user->hasRole('hospital_admin');
    }
}
