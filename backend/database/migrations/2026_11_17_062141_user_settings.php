
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_settings', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('user_id')->unique();

            $table->enum('theme', [
                'Light',
                'Dark',
                'System',
            ])->default('Light');

            $table->enum('accent_color', [
                'Violet',
                'Blue',
                'Teal',
                'Amber',
                'Pink',
            ])->default('Violet');

            $table->boolean('compact_sidebar')->default(false);
            $table->boolean('auto_save')->default(true);
            $table->boolean('spell_check')->default(true);
            $table->boolean('show_word_count')->default(true);
            $table->boolean('markdown_support')->default(false);
            $table->boolean('analytics_enabled')->default(false);
            $table->boolean('activity_history')->default(true);
            $table->boolean('lock_notes')->default(false);

            $table->timestamps();

            // User foreign key
            $table->foreign('user_id', 'fk_settings_user')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_settings');
    }
};
