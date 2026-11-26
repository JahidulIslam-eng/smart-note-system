<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class UpcomingTasksController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->user()->id;

        // Total upcoming tasks
        $upcomingTasks = Task::where('user_id', $userId)
            ->whereNull('deleted_at')
            ->where('status', '!=', 'Completed')
            ->whereNotNull('due_date')
            ->where('due_date', '>=', now())
            ->count();

        // Upcoming tasks due this month
        $currentMonth = Task::where('user_id', $userId)
            ->whereNull('deleted_at')
            ->where('status', '!=', 'Completed')
            ->whereBetween('due_date', [
                now(),
                now()->endOfMonth()
            ])
            ->count();

        // Tasks due last month
        $lastMonth = Task::where('user_id', $userId)
            ->whereNull('deleted_at')
            ->where('status', '!=', 'Completed')
            ->whereBetween('due_date', [
                now()->subMonth()->startOfMonth(),
                now()->subMonth()->endOfMonth()
            ])
            ->count();

        $percentage = $lastMonth > 0
            ? round((($currentMonth - $lastMonth) / $lastMonth) * 100)
            : ($currentMonth > 0 ? 100 : 0);

        return response()->json([
            'success' => true,
            'upcomingTasks' => $upcomingTasks,
            'percentage' => $percentage,
        ]);
    }
}
