<?php
namespace App\Http\Controllers\API;
use Illuminate\Http\Request; 
use App\Http\Controllers\Controller; 
use Illuminate\Support\Facades\Auth; 
use App\User; 
use Validator;
class AuthController extends Controller 
{
  /** 
   * Login API 
   * 
   * @return \Illuminate\Http\Response 
   */ 
  public function profile(Request $request){
    
  }

  public function login(Request $request){ 
    if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){ 
      $user = Auth::user(); 
      $success['token'] =  $user->createToken('LaraPassport')->accessToken; 
      return response()->json([
        'status' => 'success',
        'data' => $success
      ]); 
    } else { 
      return response()->json([
        'status' => 'error',
        'data' => 'Unauthorized Access'
      ]); 
    } 
  }

  /** 
   * Register API 
   * 
   * @return \Illuminate\Http\Response 
   */ 
  public function register(Request $request) 
  { 
    $validator = Validator::make($request->all(), [ 
      'name' => 'required', 
      'email' => 'required|email', 
      'password' => 'required', 
      'c_password' => 'required|same:password', 
    ]);
    if ($validator->fails()) { 
      return response()->json(['error'=>$validator->errors()]);
    }
    $postArray = $request->all(); 
    $postArray['password'] = bcrypt($postArray['password']); 
    $user = User::create($postArray); 
    $success['token'] =  $user->createToken('LaraPassport')->accessToken; 
    $success['name'] =  $user->name;
    return response()->json([
      'status' => 'success',
      'data' => $success,
    ]); 
  }

  /** 
   * UpdatePassword API 
   * 
   * @return \Illuminate\Http\Response 
   */ 
  public function updatepassword(Request $request) 
  { 
    $validator = Validator::make($request->all(), [ 
      'password' => 'required', 
      'c_password' => 'required|same:password', 
    ]);
    if ($validator->fails()) { 
      return response()->json(['error'=>$validator->errors()]);
    }
    $postArray = $request->all(); 
    $postArray['password'] = bcrypt($postArray['password']);    
    $updateduser = $request->user()->update($postArray);

    return response()->json([
      'status' => 'success',
      'data' => $updateduser,
    ]); 
  }

}