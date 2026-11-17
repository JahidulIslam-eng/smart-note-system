
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tags', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('user_id');

            $table->string('name', 80);
            $table->string('color', 30)->default('#8B5CF6');

            $table->timestamps();

            // Composite unique key
            $table->unique(['id', 'user_id'], 'uq_tags_id_user');

            // Same user cannot have duplicate tag names
            $table->unique(['user_id', 'name'], 'uq_tags_user_name');

            // Foreign key
            $table->foreign('user_id', 'fk_tags_user')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tags');
    }
};
