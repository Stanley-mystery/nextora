<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CreatorDashboardController;
use App\Http\Controllers\CreatorProfileController;
use App\Http\Controllers\CreatorSiteController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/creator/{profile:site_slug}', [CreatorSiteController::class, 'show'])
    ->name('creator.show');

Route::get('/creator/{profile:site_slug}/cart', [CartController::class, 'index'])
    ->name('cart.index');
Route::post('/creator/{profile:site_slug}/cart/add/{product}', [CartController::class, 'add'])
    ->name('cart.add');
Route::patch('/creator/{profile:site_slug}/cart/item/{product}', [CartController::class, 'update'])
    ->name('cart.update');
Route::delete('/creator/{profile:site_slug}/cart/item/{product}', [CartController::class, 'remove'])
    ->name('cart.remove');
Route::delete('/creator/{profile:site_slug}/cart', [CartController::class, 'clear'])
    ->name('cart.clear');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [CreatorDashboardController::class, 'index'])->name('dashboard');
    Route::put('/dashboard/profile', [CreatorProfileController::class, 'update'])->name('creator-profile.update');
    Route::post('/dashboard/products', [ProductController::class, 'store'])->name('products.store');
    Route::put('/dashboard/products/{product}', [ProductController::class, 'update'])->name('products.update');
    Route::delete('/dashboard/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
