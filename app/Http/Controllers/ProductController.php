<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class ProductController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $profile = $request->user()->creatorProfile;

        if (! $profile) {
            abort(404);
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'description' => ['nullable', 'string', 'max:2000'],
            'price' => ['required', 'numeric', 'min:0'],
            'image' => ['nullable', 'image', 'max:4096'],
            'is_active' => ['nullable', 'boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        $slug = $this->generateUniqueSlug($profile->id, $validated['name']);
        $imagePath = $request->file('image')?->store('products', 'public');

        $profile->products()->create([
            'name' => $validated['name'],
            'slug' => $slug,
            'description' => $validated['description'] ?? null,
            'price' => $validated['price'],
            'image_path' => $imagePath,
            'is_active' => (bool) ($validated['is_active'] ?? true),
            'sort_order' => (int) ($validated['sort_order'] ?? 0),
        ]);

        return Redirect::route('dashboard');
    }

    public function update(Request $request, Product $product): RedirectResponse
    {
        $profile = $request->user()->creatorProfile;

        if (! $profile || $product->creator_profile_id !== $profile->id) {
            abort(403);
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'description' => ['nullable', 'string', 'max:2000'],
            'price' => ['required', 'numeric', 'min:0'],
            'image' => ['nullable', 'image', 'max:4096'],
            'remove_image' => ['nullable', 'boolean'],
            'is_active' => ['nullable', 'boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'slug' => [
                'nullable',
                'string',
                Rule::unique('products', 'slug')
                    ->where('creator_profile_id', $profile->id)
                    ->ignore($product->id),
            ],
        ]);

        $slugInput = $validated['slug'] ?? $validated['name'];
        $slug = $this->generateUniqueSlug(
            $profile->id,
            $slugInput,
            $product->id
        );

        if ($request->boolean('remove_image') && $product->image_path) {
            Storage::disk('public')->delete($product->image_path);
            $product->image_path = null;
        }

        if ($request->file('image')) {
            if ($product->image_path) {
                Storage::disk('public')->delete($product->image_path);
            }

            $product->image_path = $request->file('image')->store('products', 'public');
        }

        $product->fill([
            'name' => $validated['name'],
            'slug' => $slug,
            'description' => $validated['description'] ?? null,
            'price' => $validated['price'],
            'is_active' => (bool) ($validated['is_active'] ?? true),
            'sort_order' => (int) ($validated['sort_order'] ?? 0),
        ]);

        $product->save();

        return Redirect::route('dashboard');
    }

    public function destroy(Request $request, Product $product): RedirectResponse
    {
        $profile = $request->user()->creatorProfile;

        if (! $profile || $product->creator_profile_id !== $profile->id) {
            abort(403);
        }

        if ($product->image_path) {
            Storage::disk('public')->delete($product->image_path);
        }

        $product->delete();

        return Redirect::route('dashboard');
    }

    private function generateUniqueSlug(int $profileId, string $source, ?int $ignoreProductId = null): string
    {
        $baseSlug = Str::slug($source);
        $baseSlug = $baseSlug !== '' ? $baseSlug : 'product';
        $slug = $baseSlug;
        $counter = 1;

        while (
            Product::query()
                ->where('creator_profile_id', $profileId)
                ->when($ignoreProductId, fn ($query) => $query->whereKeyNot($ignoreProductId))
                ->where('slug', $slug)
                ->exists()
        ) {
            $slug = "{$baseSlug}-{$counter}";
            $counter++;
        }

        return $slug;
    }
}
