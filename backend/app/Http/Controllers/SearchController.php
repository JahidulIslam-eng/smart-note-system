<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'q' => 'required|string|min:1|max:100',
        ]);

        $userId = $request->user()->id;
        $query = trim($request->query('q'));

        // Search Notes
        $notes = DB::table('notes')
            ->where('user_id', $userId)
            ->where('title', 'LIKE', "%{$query}%")
            ->select('id', 'title')
            ->limit(5)
            ->get()
            ->map(fn ($note) => [
                'id' => $note->id,
                'title' => $note->title,
                'type' => 'note',
            ]);

        // Search Tasks
        $tasks = DB::table('tasks')
            ->where('user_id', $userId)
            ->whereNull('deleted_at')
            ->where(function ($q) use ($query) {
                $q->where('title', 'LIKE', "%{$query}%")
                  ->orWhere('description', 'LIKE', "%{$query}%");
            })
            ->select('id', 'title')
            ->limit(5)
            ->get()
            ->map(fn ($task) => [
                'id' => $task->id,
                'title' => $task->title,
                'type' => 'task',
            ]);

        // Search Folders
        $folders = DB::table('folders')
            ->where('user_id', $userId)
            ->where('name', 'LIKE', "%{$query}%")
            ->select('id', 'name')
            ->limit(5)
            ->get()
            ->map(fn ($folder) => [
                'id' => $folder->id,
                'title' => $folder->name,
                'type' => 'folder',
            ]);

        return response()->json([
            'success' => true,
            'results' => $notes
                ->concat($tasks)
                ->concat($folders)
                ->values(),
        ]);
    }
}
