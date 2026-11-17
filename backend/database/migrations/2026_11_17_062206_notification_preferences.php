
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('notification_preferences', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('user_id')->unique();

            $table->boolean('task_reminders')->default(true);
            $table->boolean('deadline_alerts')->default(true);
            $table->boolean('daily_summary')->default(false);
            $table->boolean('email_notifications')->default(false);
            $table->boolean('push_notifications')->default(false);

            $table->timestamps();

            // User foreign key
            $table->foreign(
                'user_id',
                'fk_notification_preferences_user'
            )
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notification_preferences');
    }
};
