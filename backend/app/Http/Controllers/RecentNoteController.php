<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Note;

class RecentNoteController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $notes = Note::where('user_id', $user->id)
            ->orderBy('updated_at', 'desc')
            ->take(5)
            ->get();

        return response()->json([
            'success' => true,
            'notes' => $notes,
        ]);
    }
}
