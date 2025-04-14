<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Payment;
use Inertia\Response;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Payments', [
            'payments' => Payment::orderBy('created_at', 'desc')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request data
        $request->validate([
            'email' => 'required|email|unique:payments,email,',
            'amount' => 'required|numeric|min:0',
            'status' => 'required|in:pending,success,failed,processing',
        ]);

        // Update the payment details
        Payment::create([
            'email' => $request->email,
            'amount' => $request->amount,
            'status' => $request->status,
        ]);

        return response()->json(['message' => 'Payment added successfully!'], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Validate the request data
        $request->validate([
            'email' => 'required|email|unique:payments,email,' . $id,
            'amount' => 'required|numeric|min:0',
            'status' => 'required|in:pending,success,failed,processing',
        ]);

        // Find the payment by ID
        $payment = Payment::findOrFail($id);

        // Update the payment details
        $payment->update([
            'email' => $request->email,
            'amount' => $request->amount,
            'status' => $request->status,
        ]);

        return response()->json(['message' => 'Payment updated successfully!'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $payment = Payment::findOrFail($id);
        $payment->delete();
        return  redirect()->back()->with('success', 'Payment Deleted Successfullu');
    }
}
