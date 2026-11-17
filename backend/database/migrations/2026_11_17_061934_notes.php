
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('notes', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('folder_id')->nullable();

            $table->string('title', 255);
            $table->longText('content')->nullable();

            $table->boolean('is_pinned')->default(false);
            $table->boolean('is_archived')->default(false);
            $table->boolean('is_favorite')->default(false);

            $table->timestamps();
            $table->softDeletes();

            // Composite unique key
            $table->unique(['id', 'user_id'], 'uq_notes_id_user');

            // Indexes
            $table->index(
                ['user_id', 'updated_at'],
                'idx_notes_user_updated'
            );

            $table->index(
                ['folder_id', 'user_id'],
                'idx_notes_folder_user'
            );

            // User foreign key
            $table->foreign('user_id', 'fk_notes_user')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            // Composite folder ownership foreign key
            $table->foreign(
                ['folder_id', 'user_id'],
                'fk_notes_folder_owner'
            )
                ->references(['id', 'user_id'])
                ->on('folders')
                ->onDelete('restrict');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notes');
    }
};
