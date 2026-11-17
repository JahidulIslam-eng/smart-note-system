
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('note_tags', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('note_id');
            $table->unsignedBigInteger('tag_id');

            // Composite primary key
            $table->primary(['note_id', 'tag_id']);

            // Index
            $table->index(
                ['tag_id', 'user_id'],
                'idx_note_tags_tag_user'
            );

            // User foreign key
            $table->foreign('user_id', 'fk_note_tags_user')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            // Note ownership foreign key
            $table->foreign(
                ['note_id', 'user_id'],
                'fk_note_tags_note_owner'
            )
                ->references(['id', 'user_id'])
                ->on('notes')
                ->onDelete('cascade');

            // Tag ownership foreign key
            $table->foreign(
                ['tag_id', 'user_id'],
                'fk_note_tags_tag_owner'
            )
                ->references(['id', 'user_id'])
                ->on('tags')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('note_tags');
    }
};
