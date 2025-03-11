<?php

namespace App\Http\Controllers\API;

    use App\Http\Controllers\Controller;
    use Illuminate\Http\Request;
    use App\Models\Issues;
    use App\Models\User;
    use App\Models\Notification;
    use Illuminate\Support\Facades\Auth;
    use Illuminate\Support\Facades\Hash;
    use Illuminate\Support\Facades\Validator;

    class IssueController extends Controller
    {
        public function index() 
        {
            // $issues = Issues::all();
            $issues = Issues::orderBy('overall_risk_score','desc')->get();

            
            if ($issues->count() > 0) {
                return response()->json([
                    'status' => 200,
                    'issues' => $issues
                ], 200);
            } else {
                return response()->json([
                    'status' => 404,
                    'issues' => 'No Records Found'
                ], 404);
            }
        }
        
        
        // public function login(Request $request)
        // {

        //     $user = User::find($request->email);

        //     logger()->info('Login request received', ['request' => $request->all()]);

        //     $validator = Validator::make($request->all(), [
        //         'email' => 'required|email',
        //         'password' => 'required',
        //     ]);

        //     if ($validator->fails()) {
        //         return response()->json(['error' => $validator->errors()], 400);
        //     }

        //     $hashedPassword = hash_hmac('sha256', $request->password, env('HMAC_SECRET_KEY'));

        //     echo $user;

        //     // echo $request->password;

        //     if ( Hash::check($hashedPassword == $user->password)) {
        //         // Hash::check
                
        //             $user = Auth::user();
        //             $token = $user->createToken('AuthToken')->plainTextToken;
                
        //             logger()->info('User logged in successfully', ['user_id' => $user->id, 'token' => $token]);

        //         return response()->json(['token' => $token], 200);
        //     }

        //     logger()->warning('Authentication failed', ['email' => $request->email]);

        //     return response()->json(['error' => 'Unauthorized'], 401);
        // }




        //  public function login(Request $request)
        // {
        //     logger()->info('Login request received', ['request' => $request->all()]);

        //     $credentials = $request->only('email', 'password');

        //     try {
        //         $user = User::where('email', $credentials['email'])->firstOrFail();


        //         print_r($request->password);
        //         print_r($user->password);
        //         if ($request->password !== $user->password) {
        //                     // if (!Hash::check($request->password, $user->password)) {
        //                     logger()->warning('Authentication failed', ['email' => $request->email]);
        //                     return response()->json(['error' => 'Unauthorized password'], 401);
        //                 }

        //         $token = $user->createToken('auth-token')->plainTextToken;

        //         logger()->info('User logged in successfully', ['user_id' => $user->id, 'token' => $token]);

        //         return response()->json(['token' => $token], 200);
        //     } catch (\Exception $e) {
        //         logger()->warning('Authentication failed', ['email' => $request->email]);
        //         return response()->json(['error' => 'Unauthorized'], 401);
        //     }
        // }

        public function login(Request $request)
        {
            logger()->info('Login request received', ['request' => $request->all()]);

            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 400);
            }

            $user = User::where('email', $request->email)->first();

            if (!$user) {
                logger()->warning('Authentication failed', ['email' => $request->email]);
                return response()->json(['error' => 'Unauthorized user'], 401);
            }

            // print_r($request->password);
            // print_r($user->password);

            if ($request->password !== $user->password) {
                // if (!Hash::check($request->password, $user->password)) {
                logger()->warning('Authentication failed', ['email' => $request->email]);
                return response()->json(['error' => 'Unauthorized password'], 401);
            }

            $token = $user->createToken('AuthToken')->plainTextToken;

            logger()->info('User logged in successfully', ['user_id' => $user->id, 'token' => $token]);

            return response()->json(['token' => $token], 200);
        }

        public function register(Request $request)
        {
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|min:6',
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 400);
            }

            $hashedPassword = hash_hmac('sha256', $request->password, env('HMAC_SECRET_KEY'));


            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($hashedPassword),
            ]);

            if ($user) {

                return response()->json([
                    'status' => true,
                    'message' => 'user Created successfully',
                    'error' => [],
                    'data' => $user, 
                ], 200);


                // $token = $user->createToken('AuthToken')->plainTextToken;

                // return response()->json([
                //     'status' => 201,
                //     'message' => 'User created ',
                //     'user' => $user,
                //     'token' => $token,
                // ], 201);
            }
            
            return response()->json([
                'status' => 500,
                'message' => 'Server error',
            ], 500);
        }


        public function list(){
            
            $issues = Issues::orderBy('overall_risk_score','desc')->get();

            
            if ($issues->count() > 0) {
                return response()->json([
                    'status' => 200,
                    'issues' => $issues
                ], 200);
            } else {
                return response()->json([
                    'status' => 404,
                    'issues' => 'No Records Found'
                ], 404);
            }
        }

        public function store(Request $request)
        {
            $validator = Validator::make($request->all(), [
                'client_id' => 'required|string|max:255',
                'title' => 'required|string|max:255',
                'assessment_type' => 'required|string|max:255',
                'ip' => 'required|string|max:255',
                'category' => 'required|string|max:255',
                'initial_closure_date' => 'required|date',
                'action_owner' => 'required|string|max:255',
                'tester_status' => 'required|string|max:255',
                'overall_risk_score' => 'required|numeric',
                'severity' => 'required|string|max:255',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 422,
                    'errors' => $validator->messages()
                ], 422);
            } else {
                $issue = Issues::create($request->all());

                if ($issue) {
                    return response()->json([
                        'status' => 200,
                        'message' => 'Issue Created Successfully'
                    ], 200);
                } else {
                    return response()->json([
                        'status' => 500,
                        'message' => 'Something Went Wrong!'
                    ], 500);
                }
            }
        }

        public function show($id)
        {
            $issue = Issues::find($id);

            if ($issue) {
                return response()->json([
                    'status' => 200,
                    'issue' => $issue
                ], 200);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No Such Issue Found!'
                ], 404);
            }
        }

        public function view($id){
            $issue = Issues::where('id',$id)->get()->toArray();


            if ($issue) {
                return response()->json([
                    'status' => 200,
                    'issue' => $issue
                ], 200);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No Such Issue Found!',
                    'data' => $issue
                ], 404);
            }
        }
        
        public function xyz(Request $request)
        {
            // $validator = Validator::make($request->all()
            // , [
            //     'assessment_type' => 'required|string|max:255',
            //     'network_zone' => 'required|integer',
            //     'env_type' => 'required|string|max:255',
            //     'data_classification' => 'required|integer',
            //     'exploitability' => 'required|string|max:255'
            // ]
            // );

            // if ($validator->fails()) {
            //     return response()->json([
                //         'status' => 422,
                //         'errors' => $validator->messages()
                //     ], 422);
                // } else {

                    $issue = Issues::find($request->id);
                    
                    if ($issue) {
                    
                    $issue->asset_criticality = $request->input('asset_criticality');
                    $issue->network_zone = $request->input('network_zone');
                    $issue->type = $request->input('type');
                    $issue->data_classification = $request->input('data_classification');
                    $issue->severity = $request->input('severity');
                    $issue->epss_percentile = $request->input('epss_percentile');
                    // test();
                    
                    $average = (($this->vulAsset($issue->asset_criticality)) + ($this->vulNet($issue->network_zone)) + ($this->vulEnv($issue->type)) + ($this->vulData($issue->data_classification))) / 4;
                    

                    $exploitability = $average * ($this->vulnSeverityScore($issue->severity));
                    
                    $issue->exploitability = $exploitability;

                    
                    $issue->save();
                    return response()->json([
                        'status' => 200,
                        'message' => 'Issue Updated Successfully',
                        'vulAsset' => $this->vulAsset($issue->asset_criticality),
                        'vulNet'=> $this->vulNet($issue->network_zone),
                        'vulEnv' => $this->vulEnv($issue->type),
                        'vulData' => $this->vulData($issue->data_classification),
                        'severity' => $this->vulnSeverityScore($issue->severity),
                        'avg_data' => $average,
                        'exploitability' => $exploitability
                    ], 200); 
                } else {
                    return response()->json([
                        'status' => 404,
                        'message' => 'No Such Issue Found!'
                    ], 404);
                    // }
                }
                
                
        }

        public function vulnSeverityScore($severity){
            $sev = 0;

            switch ($severity) {
                case 1:
                case 2:
                    $sev = 50; // High
                    break;
                case 3:
                    $sev = 30; // Medium
                    break;
                case 4:
                    $sev = 20; // Low
                    break;
                default:
                    $sev = 1; // Default value
                    break;
            }
            return $sev;
        }

        public function vulAsset($asset_criticality){
            $asset=0;
            
            switch ($asset_criticality) {
                case 1:
                    $assert = 5;
                    break;

                case 2:
                    $assert = 3;
                    break;
                
                case 3:
                    $assert = 2;
                    break;

                default:
                    $assert = 0;
            }
            return $assert;
        }

        public function vulNet($network_zone) {
            $net = 0;

            switch($network_zone) {
                case 1:
                    $net = 5;
                    break;

                case 2:
                    $net = 10;
                    break;

                default:
                    $net = 0;
            }   
            return $net;
        }

        public function vulEnv($type) {
            $net = 0;

            switch($type) {
                case 1:
                    $net = 7;
                    break;

                case 2:
                    $net = 2;
                    break;

                case 3:
                    $net = 1;
                    break;
                
                default:
                    $net = 0;
            }
            return $net;
        }


        public function vulData($data_classification) {
            $net = 0;

            switch($data_classification) {
                case 1:
                    $net = 6;
                    break;

                case 2:
                    $net = 4;
                    break;

                case 3:
                    $net = 0;
                    break;
                
                default:
                    $net = 0;
            }
            return $net;
        }


        public function handleAction($id, Request $request)
        {
            $notification = Notification::find($id);
            if (!$notification) {
                return response()->json(['error' => 'Notification not found'], 404);
            }

            $action = $request->input('action');
            if ($action === '1') {
                $notification->status = '1';
            } elseif ($action === 'close') {
                // $notification->status = 'closed';
            }

            $notification->save();

            return response()->json(['success' => 'Notification updated']);
        }

        public function getAllNotifications()
        {
            $notifications = Notification::where('status', '!=', '1')->get();
            // $notifications = Notification::all();
            return response()->json($notifications);
        }


        
        // public function destroy($id)
        // {
        //         $issue = Issues::find($id);

        //         if ($issue) {
        //                 $issue->delete();
        //         return response()->json([
        //             'status' => 200,
        //             'message' => 'Issue Deleted Successfully'
        //         ], 200);
        //     } else {
        //         return response()->json([
        //             'status' => 404,
        //             'message' => 'No Such Issue Found!'
        //         ], 404);
        //     }
        // }
    }


    /*
    public function abc(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|integer', // Assuming 'id' is required for identifying the record
            'asset_criticality' => 'required|numeric',
            'network_zone' => 'required|numeric',
            'env_type' => 'required|string|max:255',
            'data_classification' => 'required|numeric',
            'severity' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        }

        $issue = Issues::find($request->id);
            
        if (!$issue) {
            return response()->json([
                'status' => 404,
                'message' => 'No Such Issue Found!'
            ], 404);
        }

        // Calculate exploitability
        $average = ($issue->asset_criticality + $issue->network_zone + $issue->env_type + $issue->data_classification) / 4;
        $exploitability = $average * $issue->severity;

        // Update exploitability column
        $issue->exploitability = $exploitability;
        $issue->save();

        return response()->json([
            'status' => 200,
            'message' => 'Issue Updated Successfully'
        ], 200); 
    }


    */
