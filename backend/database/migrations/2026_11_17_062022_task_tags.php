
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('task_tags', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('task_id');
            $table->unsignedBigInteger('tag_id');

            // Composite primary key
            $table->primary(['task_id', 'tag_id']);

            // Index
            $table->index(
                ['tag_id', 'user_id'],
                'idx_task_tags_tag_user'
            );

            // User foreign key
            $table->foreign('user_id', 'fk_task_tags_user')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            // Task ownership foreign key
            $table->foreign(
                ['task_id', 'user_id'],
                'fk_task_tags_task_owner'
            )
                ->references(['id', 'user_id'])
                ->on('tasks')
                ->onDelete('cascade');

            // Tag ownership foreign key
            $table->foreign(
                ['tag_id', 'user_id'],
                'fk_task_tags_tag_owner'
            )
                ->references(['id', 'user_id'])
                ->on('tags')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('task_tags');
    }
};
