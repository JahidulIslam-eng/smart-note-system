<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class CompletedTasksController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->user()->id;

        // Total completed tasks
        $completedTasks = Task::where('user_id', $userId)
            ->where('status', 'completed')
            ->whereNull('deleted_at')
            ->count();

        // Completed tasks this month
        $currentMonth = Task::where('user_id', $userId)
            ->where('status', 'completed')
            ->whereNull('deleted_at')
            ->whereBetween('updated_at', [
                now()->startOfMonth(),
                now()->endOfMonth()
            ])
            ->count();

        // Completed tasks last month
        $lastMonth = Task::where('user_id', $userId)
            ->where('status', 'completed')
            ->whereNull('deleted_at')
            ->whereBetween('updated_at', [
                now()->subMonth()->startOfMonth(),
                now()->subMonth()->endOfMonth()
            ])
            ->count();

        // Percentage calculation
        $percentage = $lastMonth > 0
            ? round((($currentMonth - $lastMonth) / $lastMonth) * 100)
            : ($currentMonth > 0 ? 100 : 0);

        return response()->json([
            'success' => true,
            'completedTasks' => $completedTasks,
            'percentage' => $percentage,
        ]);
    }
}
