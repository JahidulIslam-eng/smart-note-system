


<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ai_messages', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('conversation_id');

            $table->enum('role', [
                'system',
                'user',
                'assistant',
            ]);

            $table->longText('content');

            $table->json('metadata')->nullable();

            $table->unsignedInteger('prompt_tokens')->nullable();
            $table->unsignedInteger('completion_tokens')->nullable();

            $table->timestamps();

            // Index
            $table->index(
                ['conversation_id', 'user_id', 'created_at'],
                'idx_ai_messages_conversation_user'
            );

            // User foreign key
            $table->foreign('user_id', 'fk_ai_messages_user')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            // Conversation ownership foreign key
            $table->foreign(
                ['conversation_id', 'user_id'],
                'fk_ai_messages_conversation_owner'
            )
                ->references(['id', 'user_id'])
                ->on('ai_conversations')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ai_messages');
    }
};
