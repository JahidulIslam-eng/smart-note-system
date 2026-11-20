<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class RegistrationController extends Controller
{
    public function register(Request $request)
    {
        // Validate registration data
        $validated = $request->validate([
            'name' => 'required|string|max:100',

            'email' => 'required|email|max:150|unique:users,email',

            'password' => 'required|string|min:8|confirmed',
        ]);

        // Create new user
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password'],
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Registration successful!',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
        ], 201);
    }
}
