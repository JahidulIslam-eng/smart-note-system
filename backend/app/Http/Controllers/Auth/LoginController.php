<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        // Validate login data
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        // Find user by email
        $user = User::where('email', $validated['email'])->first();

        // Check user and password
        if (!$user || $user->password !== $validated['password']) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid email or password.',
            ], 401);
        }
$token = $user->createToken('smartnote-token')->plainTextToken;
        // Login successful
        return response()->json([
            'success' => true,
            'message' => 'Login successful!',
             'token' => $token,

            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
        ], 200);
    }
}