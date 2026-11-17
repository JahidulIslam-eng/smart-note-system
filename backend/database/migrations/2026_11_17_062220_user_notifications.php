
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_notifications', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('user_id');

            $table->string('type', 100);
            $table->string('title', 255);

            $table->text('message')->nullable();

            $table->json('data')->nullable();

            $table->timestamp('read_at')->nullable();

            $table->timestamps();

            // Index
            $table->index(
                ['user_id', 'read_at', 'created_at'],
                'idx_user_notifications_user_read'
            );

            // User foreign key
            $table->foreign(
                'user_id',
                'fk_user_notifications_user'
            )
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_notifications');
    }
};
