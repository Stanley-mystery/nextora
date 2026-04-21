<?php

namespace App\Http\Controllers;

use App\Models\CreatorProfile;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CreatorSiteController extends Controller
{
    public function show(CreatorProfile $profile, Request $request): Response
    {
        $products = $profile->products()->where('is_active', true)->get();
        $cart = $this->getNormalizedCart($request, $profile);

        return Inertia::render('CreatorSite', [
            'profile' => $profile,
            'products' => $products,
            'cartCount' => array_sum($cart),
        ]);
    }

    private function getNormalizedCart(Request $request, CreatorProfile $profile): array
    {
        $rawCart = $request->session()->get($this->cartKey($profile), []);

        $cart = collect($rawCart)
            ->filter(fn ($qty, $productId) => is_numeric($productId) && (int) $qty > 0)
            ->mapWithKeys(fn ($qty, $productId) => [(int) $productId => (int) $qty])
            ->all();

        if ($cart === []) {
            return [];
        }

        $validProductIds = Product::query()
            ->where('creator_profile_id', $profile->id)
            ->whereIn('id', array_keys($cart))
            ->pluck('id')
            ->map(fn ($id) => (int) $id)
            ->all();

        $validCart = collect($cart)
            ->only($validProductIds)
            ->all();

        if ($validCart !== $cart) {
            $request->session()->put($this->cartKey($profile), $validCart);
        }

        return $validCart;
    }

    private function cartKey(CreatorProfile $profile): string
    {
        return "cart.profile.{$profile->id}";
    }
}
