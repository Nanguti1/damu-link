<?php

use App\Actions\BloodAppeals\ExpireBloodAppealAction;
use App\Actions\DonationClaims\ExpireDonationClaimsAction;
use App\Models\BloodAppeal;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('damulink:expire-claims', function (ExpireDonationClaimsAction $action): int {
    $expired = $action->execute();
    $this->info("Expired {$expired} donation claims.");

    return self::SUCCESS;
})->purpose('Expire reserved donation claims that passed their reservation window');

Artisan::command('damulink:expire-appeals', function (ExpireBloodAppealAction $action): int {
    $expired = 0;

    BloodAppeal::whereIn('status', ['pending_verification', 'verified'])
        ->where('created_at', '<', now()->subDays(7))
        ->each(function (BloodAppeal $appeal) use ($action, &$expired): void {
            $action->execute($appeal);
            $expired++;
        });

    $this->info("Expired {$expired} blood appeals.");

    return self::SUCCESS;
})->purpose('Expire stale blood appeals after seven days');

Schedule::command('damulink:expire-claims')->everyFiveMinutes();
Schedule::command('damulink:expire-appeals')->hourly();
