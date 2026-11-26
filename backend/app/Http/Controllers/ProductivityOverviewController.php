<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ProductivityOverviewController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->user()->id;

        $thisWeekStart = now()->startOfWeek(Carbon::MONDAY);
        $lastWeekStart = $thisWeekStart->copy()->subWeek();

        return response()->json([
            'success' => true,

            'weeklyData' => [
                'This Week' => $this->getWeeklyData(
                    $userId,
                    $thisWeekStart
                ),

                'Last Week' => $this->getWeeklyData(
                    $userId,
                    $lastWeekStart
                ),
            ],
        ]);
    }

    private function getWeeklyData($userId, $weekStart)
    {
        $weekEnd = $weekStart->copy()->endOfWeek(Carbon::SUNDAY);

        // Daily task statistics
        $tasks = DB::table('tasks')
            ->selectRaw("
                DATE(created_at) as date,
                COUNT(*) as total_tasks,
                SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed_tasks
            ")
            ->where('user_id', $userId)
            ->whereBetween('created_at', [
                $weekStart->copy()->startOfDay(),
                $weekEnd->copy()->endOfDay()
            ])
            ->groupByRaw('DATE(created_at)')
            ->get()
            ->keyBy('date');

        // Daily notes count
        $notes = DB::table('notes')
            ->selectRaw('DATE(created_at) as date, COUNT(*) as total_notes')
            ->where('user_id', $userId)
            ->whereBetween('created_at', [
                $weekStart->copy()->startOfDay(),
                $weekEnd->copy()->endOfDay()
            ])
            ->groupByRaw('DATE(created_at)')
            ->get()
            ->keyBy('date');

        $weeklyData = [];

        for ($i = 0; $i < 7; $i++) {

            $date = $weekStart->copy()->addDays($i);
            $dateKey = $date->toDateString();

            $totalTasks = $tasks[$dateKey]->total_tasks ?? 0;

            $completedTasks = $tasks[$dateKey]->completed_tasks ?? 0;

            $totalNotes = $notes[$dateKey]->total_notes ?? 0;

            $percentage = $totalTasks > 0
                ? round(($completedTasks / $totalTasks) * 100)
                : 0;

            $weeklyData[] = [
                'day' => $date->format('D'),

                'value' => $percentage,

                'completionPercentage' => $percentage,

                'completedTasks' => (int) $completedTasks,

                'totalTasks' => (int) $totalTasks,

                'notesCount' => (int) $totalNotes,

                'activityCount' => (int) $completedTasks + (int) $totalNotes,
            ];
        }

        return $weeklyData;
    }
}
