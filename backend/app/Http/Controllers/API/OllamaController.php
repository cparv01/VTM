<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class OllamaController extends Controller
{
    public function runOllamaModel(Request $request)
    {
        $model = $request->input('model');
        $prompt = $request->input('prompt');
        
        $curl = curl_init();

        curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://26c8-34-83-235-116.ngrok-free.app/api/generate',
        CURLOPT_URL => 'https//localhost:1134/api/generate',
        CURLOPT_SSL_VERIFYPEER => 0,
        CURLOPT_SSL_VERIFYHOST => FALSE,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS =>'{
        "model": "llama3",
        "prompt": "'.htmlspecialchars($prompt, ENT_QUOTES, 'UTF-8').'",
        "stream": false,
        "response" : "" 
        }',
        CURLOPT_HTTPHEADER => array(
            'Content-Type: application/json'
        ),
        ));

        $response = curl_exec($curl);
        
        if (curl_errno($curl)) {
                $error_message = curl_error($curl);
                print_r($error_message);
                curl_close($curl);
            } 
        
        $decoded_resp = json_decode($response,true);

        return response()->json([
            'status' => true,
            'message' => 'Successfully',
            'errors' => [],
            'data' => $decoded_resp['response'],
        ], 200);
    }

    private function storeProcessInfo($processId, $cmd)
    {
        Log::info('Storing process info', ['process_id' => $processId, 'command' => $cmd]);
    }
}
