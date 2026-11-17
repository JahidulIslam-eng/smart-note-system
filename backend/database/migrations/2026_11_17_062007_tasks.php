
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('folder_id')->nullable();

            $table->string('title', 255);
            $table->text('description')->nullable();

            $table->enum('status', [
                'To Do',
                'In Progress',
                'Completed',
            ])->default('To Do');

            $table->enum('priority', [
                'Low',
                'Medium',
                'High',
            ])->default('Medium');

            $table->dateTime('due_date')->nullable();

            $table->timestamps();
            $table->softDeletes();

            // Composite unique key
            $table->unique(['id', 'user_id'], 'uq_tasks_id_user');

            // Indexes
            $table->index(
                ['user_id', 'status'],
                'idx_tasks_user_status'
            );

            $table->index(
                ['user_id', 'due_date'],
                'idx_tasks_user_due'
            );

            $table->index(
                ['folder_id', 'user_id'],
                'idx_tasks_folder_user'
            );

            // User foreign key
            $table->foreign('user_id', 'fk_tasks_user')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            // Composite folder ownership foreign key
            $table->foreign(
                ['folder_id', 'user_id'],
                'fk_tasks_folder_owner'
            )
                ->references(['id', 'user_id'])
                ->on('folders')
                ->onDelete('restrict');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
