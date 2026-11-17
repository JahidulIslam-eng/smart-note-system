
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('task_checklist_items', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('task_id');

            $table->string('title', 255);

            $table->boolean('is_completed')->default(false);

            $table->unsignedInteger('position')->default(0);

            $table->timestamps();

            // Index
            $table->index(
                ['task_id', 'user_id'],
                'idx_checklist_task_user'
            );

            // User foreign key
            $table->foreign('user_id', 'fk_checklist_user')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            // Task ownership foreign key
            $table->foreign(
                ['task_id', 'user_id'],
                'fk_checklist_task_owner'
            )
                ->references(['id', 'user_id'])
                ->on('tasks')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('task_checklist_items');
    }
};
