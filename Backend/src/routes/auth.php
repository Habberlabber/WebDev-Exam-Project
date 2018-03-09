<?
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

// Login
$app->post('/auth/login', function (Request $request, Response $response) {
  
  $data = $request->getParsedBody();
  $users = getData('users');

  if(!empty($data['email']) && !empty($data['password'])) {
    foreach ($users as $key => $user) {
      if(!empty($user->password) && !empty($user->email) && $user->password == $data['password'] && $user->email == $data['email']){
        $_SESSION['user'] = $user;
        $response->getBody()->write('{"message": "Login was succesfull!"}');
        return $response;
      }
    }
  } else {
    $response = $response->withStatus(400);
    $response->getBody()->write('{"message": "The required fields where not filled!"}');
    return $response;
  }

  $response = $response->withStatus(410);
  $response->getBody()->write('{"message": "Login failed!"}');
  return $response;

});

// Log out
$app->delete('/auth/login', function (Request $request, Response $response) {
  
  session_destroy();  
  $response->getBody()->write('{"message": "Logout succeded!"}');
  return $response;

});

// Log out
$app->get('/auth', function (Request $request, Response $response) {

  if(!empty($_SESSION['user'])){ // Check if the session exists
    $id = $_SESSION['user']->id; // Get the users ID
    if($_SESSION['user'] == getData('users')->$id){ // If the session object is equal to the object in the database the user is authentic!
      $response->getBody()->write('{"message": "The user is logged in!"}');
      return $response;
    }
  }

  $response = $response->withStatus(403);
  $response->getBody()->write('{"message": "The does not have access to this feature!"}');
  return $response;

});