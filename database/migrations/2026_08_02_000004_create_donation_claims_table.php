<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('donation_claims', function (Blueprint $table) {
            $table->id();
            $table->foreignId('blood_appeal_id')->constrained()->cascadeOnDelete();
            $table->foreignId('donor_registry_id')->constrained('donor_registry')->cascadeOnDelete();
            $table->timestamp('expires_at');
            $table->enum('status', ['reserved', 'arrived', 'cancelled', 'expired', 'completed'])->default('reserved');
            $table->timestamps();

            $table->index('blood_appeal_id');
            $table->index('donor_registry_id');
            $table->index('expires_at');
            $table->index('status');
            $table->index(['status', 'expires_at']);
            $table->index(['blood_appeal_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('donation_claims');
    }
};
