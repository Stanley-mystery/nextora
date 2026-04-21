<?php

namespace App\Http\Controllers;

use App\Models\CreatorProfile;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    public function index(CreatorProfile $profile, Request $request): Response
    {
        $cart = $this->getNormalizedCart($request, $profile);

        $products = Product::query()
            ->where('creator_profile_id', $profile->id)
            ->whereIn('id', array_keys($cart))
            ->get()
            ->keyBy('id');

        $items = [];
        $subtotal = 0;

        foreach ($cart as $productId => $quantity) {
            /** @var Product|null $product */
            $product = $products->get($productId);

            if (! $product) {
                continue;
            }

            $lineTotal = ((float) $product->price) * $quantity;
            $subtotal += $lineTotal;

            $items[] = [
                'product' => $product,
                'quantity' => $quantity,
                'line_total' => number_format($lineTotal, 2, '.', ''),
            ];
        }

        return Inertia::render('Cart', [
            'profile' => $profile,
            'items' => $items,
            'cartCount' => array_sum($cart),
            'subtotal' => number_format($subtotal, 2, '.', ''),
        ]);
    }

    public function add(CreatorProfile $profile, Product $product, Request $request): RedirectResponse
    {
        $this->ensureProductBelongsToProfile($profile, $product);

        $validated = $request->validate([
            'quantity' => ['nullable', 'integer', 'min:1', 'max:99'],
        ]);

        $quantityToAdd = (int) ($validated['quantity'] ?? 1);
        $cart = $this->getNormalizedCart($request, $profile);
        $current = (int) ($cart[$product->id] ?? 0);
        $cart[$product->id] = min($current + $quantityToAdd, 99);

        $request->session()->put($this->cartKey($profile), $cart);

        return redirect()->back();
    }

    public function update(CreatorProfile $profile, Product $product, Request $request): RedirectResponse
    {
        $this->ensureProductBelongsToProfile($profile, $product);

        $validated = $request->validate([
            'quantity' => ['required', 'integer', 'min:1', 'max:99'],
        ]);

        $cart = $this->getNormalizedCart($request, $profile);
        $cart[$product->id] = (int) $validated['quantity'];

        $request->session()->put($this->cartKey($profile), $cart);

        return redirect()->back();
    }

    public function remove(CreatorProfile $profile, Product $product, Request $request): RedirectResponse
    {
        $this->ensureProductBelongsToProfile($profile, $product);

        $cart = $this->getNormalizedCart($request, $profile);
        unset($cart[$product->id]);
        $request->session()->put($this->cartKey($profile), $cart);

        return redirect()->back();
    }

    public function clear(CreatorProfile $profile, Request $request): RedirectResponse
    {
        $request->session()->forget($this->cartKey($profile));

        return redirect()->back();
    }

    private function ensureProductBelongsToProfile(CreatorProfile $profile, Product $product): void
    {
        if ($product->creator_profile_id !== $profile->id || ! $product->is_active) {
            abort(404);
        }
    }

    private function getNormalizedCart(Request $request, CreatorProfile $profile): array
    {
        $rawCart = $request->session()->get($this->cartKey($profile), []);

        $cart = collect($rawCart)
            ->filter(fn ($qty, $productId) => is_numeric($productId) && (int) $qty > 0)
            ->mapWithKeys(fn ($qty, $productId) => [(int) $productId => min((int) $qty, 99)])
            ->all();

        if ($cart === []) {
            return [];
        }

        $validProductIds = Product::query()
            ->where('creator_profile_id', $profile->id)
            ->whereIn('id', array_keys($cart))
            ->where('is_active', true)
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
