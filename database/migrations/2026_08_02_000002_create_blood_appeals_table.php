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
        Schema::create('blood_appeals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('hospital_id')->constrained()->cascadeOnDelete();
            $table->string('patient_initials');
            $table->enum('blood_type', ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']);
            $table->unsignedTinyInteger('pints_required');
            $table->unsignedTinyInteger('pints_secured')->default(0);
            $table->string('contact_phone');
            $table->string('verification_document_path')->nullable();
            $table->enum('status', ['pending_verification', 'verified', 'expired', 'fulfilled'])->default('pending_verification');
            $table->timestamps();

            $table->index('blood_type');
            $table->index('status');
            $table->index('hospital_id');
            $table->index('user_id');
            $table->index(['status', 'blood_type']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blood_appeals');
    }
};
