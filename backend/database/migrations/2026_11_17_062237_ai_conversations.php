
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ai_conversations', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('user_id');

            $table->string('title', 255)
                ->default('New Conversation');

            $table->timestamps();

            // Unique composite key
            $table->unique(
                ['id', 'user_id'],
                'uq_ai_conversations_id_user'
            );

            // Index
            $table->index(
                ['user_id', 'updated_at'],
                'idx_ai_conversations_user_updated'
            );

            // User foreign key
            $table->foreign('user_id', 'fk_ai_conversations_user')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ai_conversations');
    }
};
