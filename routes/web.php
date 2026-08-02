<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\SupportController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public routes
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/appeals/create', fn () => Inertia::render('Appeals/Create'))->name('appeals.create');
Route::get('/donors/register', fn () => Inertia::render('Donors/Register'))->name('donors.register');
Route::get('/support', [SupportController::class, 'index'])->name('support');
Route::get('/privacy', fn () => Inertia::render('Privacy'))->name('privacy');
Route::get('/terms', fn () => Inertia::render('Terms'))->name('terms');

// Protected routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
