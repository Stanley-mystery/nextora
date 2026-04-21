<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CreatorProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'site_name',
        'site_slug',
        'headline',
        'hero_title',
        'hero_subtitle',
        'about',
        'portfolio_summary',
        'brand_color',
        'contact_email',
        'contact_phone',
    ];

    public function getRouteKeyName(): string
    {
        return 'site_slug';
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class)->orderBy('sort_order')->orderByDesc('id');
    }
}
