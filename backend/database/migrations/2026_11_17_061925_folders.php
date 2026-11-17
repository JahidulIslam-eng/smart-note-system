
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('folders', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('user_id');

            $table->string('name', 100);

            $table->string('color', 30)->default('#8B5CF6');

            $table->timestamps();

            // Composite unique key
            $table->unique(['id', 'user_id'], 'uq_folders_id_user');

            // Same user cannot create duplicate folder names
            $table->unique(['user_id', 'name'], 'uq_folders_user_name');

            // Foreign key
            $table->foreign('user_id', 'fk_folders_user')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('folders');
    }
};
