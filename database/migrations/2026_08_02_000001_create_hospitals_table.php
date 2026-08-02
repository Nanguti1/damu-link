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
        Schema::create('hospitals', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('county');
            $table->string('sub_county');
            $table->unsignedInteger('total_icu_beds')->default(0);
            $table->unsignedInteger('available_icu_beds')->default(0);
            $table->timestamps();

            $table->index('county');
            $table->index('sub_county');
            $table->index('available_icu_beds');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hospitals');
    }
};
