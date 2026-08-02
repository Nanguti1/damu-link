<?php

namespace App\Policies;

use App\Models\DonationClaim;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class DonationClaimPolicy
{
    use HandlesAuthorization;

    public function view(User $user, DonationClaim $claim): bool
    {
        return $user->id === $claim->donorRegistry->user_id 
            || $user->id === $claim->bloodAppeal->user_id 
            || $user->hasRole('admin');
    }

    public function viewAny(User $user): bool
    {
        return $user->hasRole('admin') || $user->hasRole('hospital_admin');
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, DonationClaim $claim): bool
    {
        return $user->id === $claim->donorRegistry->user_id || $user->hasRole('admin');
    }

    public function delete(User $user, DonationClaim $claim): bool
    {
        return $user->id === $claim->donorRegistry->user_id || $user->hasRole('admin');
    }

    public function arrive(User $user, DonationClaim $claim): bool
    {
        return $user->id === $claim->donorRegistry->user_id;
    }

    public function cancel(User $user, DonationClaim $claim): bool
    {
        return $user->id === $claim->donorRegistry->user_id;
    }

    public function complete(User $user, DonationClaim $claim): bool
    {
        return $user->hasRole('admin') || $user->hasRole('hospital_admin');
    }
}
