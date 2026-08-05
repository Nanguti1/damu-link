<?php

use App\Http\Controllers\BloodAppealController;
use App\Http\Controllers\DonationClaimController;
use App\Http\Controllers\DonorRegistryController;
use App\Http\Controllers\HospitalController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\SupportController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public routes
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/appeals', [BloodAppealController::class, 'index'])->name('appeals.index');
Route::get('/appeals/create', [BloodAppealController::class, 'create'])->name('appeals.create');
Route::get('/appeals/{appeal}', [BloodAppealController::class, 'show'])->name('appeals.show');
Route::get('/donors/register', fn () => Inertia::render('Donors/Register'))->name('donors.register');
Route::post('/donors', [DonorRegistryController::class, 'store'])->name('donors.store');
Route::get('/support', [SupportController::class, 'index'])->name('support');
Route::get('/privacy', fn () => Inertia::render('Privacy'))->name('privacy');
Route::get('/terms', fn () => Inertia::render('Terms'))->name('terms');

// Protected routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::post('/appeals', [BloodAppealController::class, 'store'])->name('appeals.store');
    Route::post('/appeals/{appeal}/claims', [DonationClaimController::class, 'store'])->name('appeals.claims.store');

    Route::patch('/donors/{donor}/location', [DonorRegistryController::class, 'updateLocation'])->name('donors.location.update');
    Route::patch('/donors/{donor}/activate', [DonorRegistryController::class, 'activate'])->name('donors.activate');
    Route::patch('/donors/{donor}/deactivate', [DonorRegistryController::class, 'deactivate'])->name('donors.deactivate');

    Route::patch('/donation-claims/{claim}/arrive', [DonationClaimController::class, 'arrive'])->name('donation-claims.arrive');
    Route::patch('/donation-claims/{claim}/cancel', [DonationClaimController::class, 'cancel'])->name('donation-claims.cancel');
    Route::patch('/donation-claims/{claim}/complete', [DonationClaimController::class, 'complete'])->name('donation-claims.complete');

    Route::resource('hospitals', HospitalController::class)->except(['show']);
    Route::patch('/hospitals/{hospital}/beds', [HospitalController::class, 'updateBeds'])->name('hospitals.beds.update');
    Route::patch('/hospitals/{hospital}/beds/increment', [HospitalController::class, 'incrementBeds'])->name('hospitals.beds.increment');
    Route::patch('/hospitals/{hospital}/beds/decrement', [HospitalController::class, 'decrementBeds'])->name('hospitals.beds.decrement');

    Route::patch('/appeals/{appeal}/verify', [BloodAppealController::class, 'verify'])->name('appeals.verify');
    Route::patch('/appeals/{appeal}/fulfill', [BloodAppealController::class, 'fulfill'])->name('appeals.fulfill');
    Route::patch('/appeals/{appeal}/pints', [BloodAppealController::class, 'updatePints'])->name('appeals.pints.update');
    Route::patch('/appeals/{appeal}/expire', [BloodAppealController::class, 'expire'])->name('appeals.expire');
});

require __DIR__.'/settings.php';
