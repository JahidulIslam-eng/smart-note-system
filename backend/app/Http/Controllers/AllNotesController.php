<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AllNotesController extends Controller
{
    // Fetch all notes
    public function index(Request $request)
    {
        $notes = DB::table('notes')
            ->where('user_id', $request->user()->id)
            ->whereNull('deleted_at')
            ->where('is_archived', 0)
            ->orderByDesc('is_pinned')
            ->orderByDesc('updated_at')
            ->get();

        return response()->json([
            'success' => true,
            'notes' => $notes,
        ]);
    }

    // Create note
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
        ]);

        $id = DB::table('notes')->insertGetId([
            'user_id' => $request->user()->id,
            'title' => $validated['title'],
            'content' => $validated['content'] ?? null,
            'is_pinned' => 0,
            'is_archived' => 0,
            'is_favorite' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $note = DB::table('notes')->where('id', $id)->first();

        return response()->json([
            'success' => true,
            'message' => 'Note created successfully',
            'note' => $note,
        ], 201);
    }

    // Fetch single note
    public function show(Request $request, $id)
    {
        $note = DB::table('notes')
            ->where('id', $id)
            ->where('user_id', $request->user()->id)
            ->whereNull('deleted_at')
            ->first();

        if (!$note) {
            return response()->json([
                'success' => false,
                'message' => 'Note not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'note' => $note,
        ]);
    }

    // Update note
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
        ]);

        $updated = DB::table('notes')
            ->where('id', $id)
            ->where('user_id', $request->user()->id)
            ->whereNull('deleted_at')
            ->update([
                'title' => $validated['title'],
                'content' => $validated['content'] ?? null,
                'updated_at' => now(),
            ]);

        if (!$updated) {
            $exists = DB::table('notes')
                ->where('id', $id)
                ->where('user_id', $request->user()->id)
                ->whereNull('deleted_at')
                ->exists();

            if (!$exists) {
                return response()->json([
                    'success' => false,
                    'message' => 'Note not found',
                ], 404);
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Note updated successfully',
        ]);
    }

    // Soft delete note
    public function destroy(Request $request, $id)
    {
        $deleted = DB::table('notes')
            ->where('id', $id)
            ->where('user_id', $request->user()->id)
            ->whereNull('deleted_at')
            ->update([
                'deleted_at' => now(),
                'updated_at' => now(),
            ]);

        if (!$deleted) {
            return response()->json([
                'success' => false,
                'message' => 'Note not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Note deleted successfully',
        ]);
    }

    // Toggle pin
    public function togglePin(Request $request, $id)
    {
        $note = DB::table('notes')
            ->where('id', $id)
            ->where('user_id', $request->user()->id)
            ->whereNull('deleted_at')
            ->first();

        if (!$note) {
            return response()->json([
                'success' => false,
                'message' => 'Note not found',
            ], 404);
        }

        $newPinStatus = !$note->is_pinned;

        DB::table('notes')
            ->where('id', $id)
            ->where('user_id', $request->user()->id)
            ->update([
                'is_pinned' => $newPinStatus,
                'updated_at' => now(),
            ]);

        return response()->json([
            'success' => true,
            'is_pinned' => (bool) $newPinStatus,
            'message' => $newPinStatus
                ? 'Note pinned successfully'
                : 'Note unpinned successfully',
        ]);
    }
}

