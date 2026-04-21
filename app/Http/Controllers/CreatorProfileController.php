<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class CreatorProfileController extends Controller
{
    public function update(Request $request): RedirectResponse
    {
        $profile = $request->user()->creatorProfile;

        if (! $profile) {
            abort(404);
        }

        $slugInput = $request->input('site_slug') ?: $request->input('site_name', '');
        $sanitizedSlug = Str::slug($slugInput);
        $request->merge([
            'site_slug' => $sanitizedSlug !== '' ? $sanitizedSlug : 'creator-site',
        ]);

        $validated = $request->validate([
            'site_name' => ['required', 'string', 'max:120'],
            'site_slug' => [
                'required',
                'string',
                'max:120',
                Rule::unique('creator_profiles', 'site_slug')->ignore($profile->id),
            ],
            'headline' => ['nullable', 'string', 'max:160'],
            'hero_title' => ['nullable', 'string', 'max:160'],
            'hero_subtitle' => ['nullable', 'string', 'max:400'],
            'about' => ['nullable', 'string', 'max:2000'],
            'portfolio_summary' => ['nullable', 'string', 'max:2000'],
            'brand_color' => ['required', 'regex:/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/'],
            'contact_email' => ['nullable', 'email', 'max:255'],
            'contact_phone' => ['nullable', 'string', 'max:40'],
        ]);

        $profile->fill([
            'site_name' => $validated['site_name'],
            'site_slug' => $validated['site_slug'],
            'headline' => $validated['headline'] ?: null,
            'hero_title' => $validated['hero_title'] ?: null,
            'hero_subtitle' => $validated['hero_subtitle'] ?: null,
            'about' => $validated['about'] ?: null,
            'portfolio_summary' => $validated['portfolio_summary'] ?: null,
            'brand_color' => $validated['brand_color'],
            'contact_email' => $validated['contact_email'] ?: null,
            'contact_phone' => $validated['contact_phone'] ?: null,
        ]);

        $profile->save();

        return Redirect::route('dashboard');
    }
}
