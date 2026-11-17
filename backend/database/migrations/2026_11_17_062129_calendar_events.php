

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('calendar_events', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('task_id')->nullable();
            $table->unsignedBigInteger('note_id')->nullable();

            $table->string('title', 255);
            $table->text('description')->nullable();

            $table->dateTime('start_at');
            $table->dateTime('end_at')->nullable();

            $table->boolean('all_day')->default(false);

            $table->string('color', 30)->default('#8B5CF6');

            $table->timestamps();

            // Indexes
            $table->index(
                ['user_id', 'start_at'],
                'idx_calendar_user_start'
            );

            $table->index(
                ['task_id', 'user_id'],
                'idx_calendar_task_user'
            );

            $table->index(
                ['note_id', 'user_id'],
                'idx_calendar_note_user'
            );

            // User foreign key
            $table->foreign('user_id', 'fk_calendar_user')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            // Task ownership foreign key
            $table->foreign(
                ['task_id', 'user_id'],
                'fk_calendar_task_owner'
            )
                ->references(['id', 'user_id'])
                ->on('tasks')
                ->onDelete('cascade');

            // Note ownership foreign key
            $table->foreign(
                ['note_id', 'user_id'],
                'fk_calendar_note_owner'
            )
                ->references(['id', 'user_id'])
                ->on('notes')
                ->onDelete('cascade');
        });

        // CHECK 1: Task and Note cannot both be assigned
        DB::statement("
            ALTER TABLE calendar_events
            ADD CONSTRAINT chk_calendar_one_reference
            CHECK (task_id IS NULL OR note_id IS NULL)
        ");

        // CHECK 2: End time cannot be earlier than start time
        DB::statement("
            ALTER TABLE calendar_events
            ADD CONSTRAINT chk_calendar_dates
            CHECK (end_at IS NULL OR end_at >= start_at)
        ");
    }

    public function down(): void
    {
        Schema::dropIfExists('calendar_events');
    }
};
