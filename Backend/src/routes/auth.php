<?
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

// Create user
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