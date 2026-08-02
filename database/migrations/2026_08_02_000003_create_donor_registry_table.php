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
        Schema::create('donor_registry', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->unique()->constrained()->nullOnDelete();
            $table->string('phone_number')->nullable()->unique();
            $table->enum('blood_type', ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']);
            $table->string('county');
            $table->string('sub_county');
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index('blood_type');
            $table->index('county');
            $table->index('sub_county');
            $table->index('is_active');
            $table->index(['county', 'blood_type']);
            $table->index(['is_active', 'blood_type']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('donor_registry');
    }
};
