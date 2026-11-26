<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegistrationController;
use App\Http\Controllers\UpcomingDeadlineController;
use App\Http\Controllers\RecentNoteController;
use App\Http\Controllers\ProductivityOverviewController;
use App\Http\Controllers\TodaysScheduleController;
use App\Http\Controllers\TotalNotesController;
use App\Http\Controllers\TotalTasksController;
use App\Http\Controllers\CompletedTasksController;
use App\Http\Controllers\UpcomingTasksController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\AllNotesController;


Route::post('/register', [RegistrationController::class, 'register']);

Route::post('/login', [LoginController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', function (Request $request) {

        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logout successful!',
        ]);
    });

    // Upcoming deadlines
    Route::get('/upcoming-deadlines', [
        UpcomingDeadlineController::class,
        'index'
    ]);

    // Future protected APIs
    // Route::apiResource('/notes', NoteController::class);
    // Route::apiResource('/tasks', TaskController::class);
Route::get('/recent-notes', [RecentNoteController::class, 'index']);

Route::get('/productivity-overview', [
    ProductivityOverviewController::class,
    'index'
]);
Route::get('/todays-schedule', [
    TodaysScheduleController::class,
    'index'
]);

Route::get('/total-notes', [TotalNotesController::class, 'index']);
Route::get('/total-tasks', [TotalTasksController::class, 'index']);
Route::get('/completed-tasks', [CompletedTasksController::class, 'index']);
Route::get('/upcoming-tasks', [UpcomingTasksController::class, 'index']);
Route::get('/search', [SearchController::class, 'index']);
Route::get('/all-notes', [AllNotesController::class, 'index']);
Route::post('/notes', [AllNotesController::class, 'store']);
Route::get('/notes/{id}', [AllNotesController::class, 'show']);
Route::put('/notes/{id}', [AllNotesController::class, 'update']);
Route::delete('/notes/{id}', [AllNotesController::class, 'destroy']);
Route::patch('/notes/{id}/pin', [AllNotesController::class, 'togglePin']);






});
