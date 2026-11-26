<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class TotalTasksController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->user()->id;

        $currentMonth = Task::where('user_id', $userId)
            ->whereNull('deleted_at')
            ->whereBetween('created_at', [
                now()->startOfMonth(),
                now()->endOfMonth()
            ])
            ->count();

        $lastMonth = Task::where('user_id', $userId)
            ->whereNull('deleted_at')
            ->whereBetween('created_at', [
                now()->subMonth()->startOfMonth(),
                now()->subMonth()->endOfMonth()
            ])
            ->count();

        $totalTasks = Task::where('user_id', $userId)
            ->whereNull('deleted_at')
            ->count();

        $percentage = $lastMonth > 0
            ? round((($currentMonth - $lastMonth) / $lastMonth) * 100)
            : ($currentMonth > 0 ? 100 : 0);

        return response()->json([
            'success' => true,
            'totalTasks' => $totalTasks,
            'percentage' => $percentage,
        ]);
    }
}
