
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('task_comments', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('task_id');

            $table->text('comment');

            $table->timestamps();

            // Index
            $table->index(
                ['task_id', 'user_id'],
                'idx_task_comments_task_user'
            );

            // User foreign key
            $table->foreign('user_id', 'fk_task_comments_user')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            // Task ownership foreign key
            $table->foreign(
                ['task_id', 'user_id'],
                'fk_task_comments_task_owner'
            )
                ->references(['id', 'user_id'])
                ->on('tasks')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('task_comments');
    }
};
