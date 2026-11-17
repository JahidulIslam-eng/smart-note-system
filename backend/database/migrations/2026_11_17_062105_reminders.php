

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reminders', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('task_id')->nullable();
            $table->unsignedBigInteger('note_id')->nullable();

            $table->string('title', 255);
            $table->text('description')->nullable();

            $table->dateTime('remind_at');

            $table->boolean('is_completed')->default(false);

            $table->dateTime('notified_at')->nullable();

            $table->timestamps();

            // Indexes
            $table->index(
                ['user_id', 'remind_at'],
                'idx_reminders_user_time'
            );

            $table->index(
                ['task_id', 'user_id'],
                'idx_reminders_task_user'
            );

            $table->index(
                ['note_id', 'user_id'],
                'idx_reminders_note_user'
            );

            // User foreign key
            $table->foreign('user_id', 'fk_reminders_user')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            // Task ownership foreign key
            $table->foreign(
                ['task_id', 'user_id'],
                'fk_reminders_task_owner'
            )
                ->references(['id', 'user_id'])
                ->on('tasks')
                ->onDelete('cascade');

            // Note ownership foreign key
            $table->foreign(
                ['note_id', 'user_id'],
                'fk_reminders_note_owner'
            )
                ->references(['id', 'user_id'])
                ->on('notes')
                ->onDelete('cascade');
        });

        // CHECK constraint
        DB::statement("
            ALTER TABLE reminders
            ADD CONSTRAINT chk_reminders_one_reference
            CHECK (task_id IS NULL OR note_id IS NULL)
        ");
    }

    public function down(): void
    {
        Schema::dropIfExists('reminders');
    }
};
