<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TodaysScheduleController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->user()->id;

        $todayStart = now()->startOfDay();
        $todayEnd = now()->endOfDay();

        // Today's Tasks
        $tasks = DB::table('tasks')
            ->where('user_id', $userId)
            ->whereBetween('due_date', [$todayStart, $todayEnd])
            ->get()
            ->map(function ($task) {
                return [
                    'id' => 'task-' . $task->id,
                    'title' => $task->title,
                    'time' => date('h:i A', strtotime($task->due_date)),
                    'color' => 'text-violet-500',
                    'type' => 'task',
                    'sortTime' => $task->due_date,
                ];
            });

        // Today's Calendar Events
        $events = DB::table('calendar_events')
            ->where('user_id', $userId)
            ->whereBetween('start_at', [$todayStart, $todayEnd])
            ->get()
            ->map(function ($event) {
                return [
                    'id' => 'event-' . $event->id,
                    'title' => $event->title,
                    'time' => $event->all_day
                        ? 'All Day'
                        : date('h:i A', strtotime($event->start_at)),
                    'color' => $event->color ?: 'text-blue-500',
                    'type' => 'event',
                    'sortTime' => $event->start_at,
                ];
            });

        // Combine and sort
        $schedules = $tasks
            ->concat($events)
            ->sortBy('sortTime')
            ->values()
            ->map(function ($item) {
                unset($item['sortTime']);
                return $item;
            });

        return response()->json([
            'success' => true,
            'schedules' => $schedules,
        ]);
    }
}
