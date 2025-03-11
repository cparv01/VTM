<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\IssueController;
use App\Http\Controllers\API\OllamaController;
use App\Models\Notification;



// Route::middLeware('auth:sanctum')->get('/isuue', function (Request $request) {
              

// Route::group(['prefix' => 'rad', 'middleware' => ['auth:api', 'log.request', 'role.privilege']], function () {
              

//         // Route::post('list', [IssueController::class, 'index'])->name('issue-list');
//         // Route::post('details', [IssueController::class, 'show'])->name('issue-view');
//         // Route::post('rad-approval', [IssueController::class, 'radApproval'])->name('issue-approval');
//     // return $request->$issue();

// });
Route::resource('issues',IssueController::class);
Route::get('list', [IssueController::class, 'list']);
Route::get('details/{id}', [IssueController::class, 'view']);
Route::post('edit', [IssueController::class, 'xyz']);
Route::post('login', [IssueController::class, 'login']);
Route::post('register', [IssueController::class, 'register']);
Route::get('notifications', [IssueController::class, 'getAllNotifications']);
Route::post('notifications/{id}/action', [IssueController::class, 'handleAction']);

Route::post('ollama', [OllamaController::class, 'runOllamaModel']);


?>
    
    