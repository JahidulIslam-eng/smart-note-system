<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class UpcomingDeadlineController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $deadlines = Task::where('user_id', $user->id)
            ->whereNotNull('due_date')
            ->where('due_date', '>=', now())
            ->orderBy('due_date', 'asc')
            ->get();

        return response()->json([
            'success' => true,
            'deadlines' => $deadlines,
        ]);
    }
}