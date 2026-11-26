<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TotalNotesController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->user()->id;

        $currentMonth = DB::table('notes')
            ->where('user_id', $userId)
            ->whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->count();

        $lastMonth = DB::table('notes')
            ->where('user_id', $userId)
            ->whereMonth('created_at', now()->subMonth()->month)
            ->whereYear('created_at', now()->subMonth()->year)
            ->count();

        $totalNotes = DB::table('notes')
            ->where('user_id', $userId)
            ->count();

        $percentage = $lastMonth > 0
            ? round((($currentMonth - $lastMonth) / $lastMonth) * 100)
            : ($currentMonth > 0 ? 100 : 0);

        return response()->json([
            'success' => true,
            'totalNotes' => $totalNotes,
            'percentage' => $percentage,
        ]);
    }
}

