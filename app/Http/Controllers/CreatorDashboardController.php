<?php

namespace App\Http\Controllers;

use App\Models\CreatorProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CreatorDashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        $profile = $user->creatorProfile;

        if (! $profile) {
            $profile = CreatorProfile::query()->create([
                'user_id' => $user->id,
                'site_name' => "{$user->name}'s Store",
                'site_slug' => $this->generateUniqueSlug($user->name),
                'headline' => 'Showcase your best work and products.',
                'hero_title' => 'Build your store with simple forms',
                'hero_subtitle' => 'Customize your website, publish products, and share your creator portfolio.',
                'about' => 'Tell people what makes your work unique.',
                'portfolio_summary' => 'Add highlights of your work, achievements, and testimonials here.',
                'brand_color' => '#1677ff',
                'contact_email' => $user->email,
            ]);
        }

        $profile->load('products');

        return Inertia::render('Dashboard', [
            'profile' => $profile,
            'products' => $profile->products,
            'publicUrl' => route('creator.show', $profile),
        ]);
    }

    private function generateUniqueSlug(string $source): string
    {
        $baseSlug = Str::slug($source);
        $baseSlug = $baseSlug !== '' ? $baseSlug : 'creator-site';
        $slug = $baseSlug;
        $counter = 1;

        while (CreatorProfile::query()->where('site_slug', $slug)->exists()) {
            $slug = "{$baseSlug}-{$counter}";
            $counter++;
        }

        return $slug;
    }
}
