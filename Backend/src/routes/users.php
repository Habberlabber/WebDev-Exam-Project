<?
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

// List all users
$app->get('/users/', function (Request $request, Response $response, array $args) {
  $users = getData("users", true);
  $response->getBody()->write($users);
  return $response;
});

// Return user based on id
$app->get('/users/{id}', function (Request $request, Response $response, array $args) {
  $id = $args['id']; // Get the id form the url
  $users = getData('users'); // Get users form the database
  if(!empty($users->$id)) { // If user with the id exists
    $user = json_encode($users->$id); // Make user object to string
    $response->getBody()->write($user); // Set the response body to the user json string
    return $response; // Return response
  }
  $response = $response->withStatus(404);
  $response->getBody()->write('{"message": "No user with the given id was found!"}');
  return $response;
});

// Create user
$app->post('/users/', function (Request $request, Response $response) {
  $data = $request->getParsedBody();
  $userObj = json_decode(json_encode($data)); // convert data form Array to JSON object
  $userObj->creation_date = $today = date("Y-m-d"); // Set the creation_date
  $userObj->user_type = !empty($userObj->user_type) ?: 0; // If no usertype is defined set to default
  if(validateUserObject($userObj, true)){
    print_r($data);
    print_r($userObj); 
    addData('users', $data);
    $response->getBody()->write('{"message": "The user have been created!"}');
    return $response;
  }else{
    $response = $response->withStatus(400);
    $response->getBody()->write('{"message": "The data was invalid!"}');
    return $response;
  }

  $success = '{"message": "The user could not be created!"}';
  $response->getBody()->write($success);

  return $response;
});

// Update user by ID
$app->put('/users/{id}', function(Request $request, Response $response){
  $id = $request->getAttribute('id'); // Get the id from the url
  $data = $request->getParsedBody(); // Get the data from the request
  $users = getData('users'); // Get all users form the Database
  if(!empty($users->$id)) { // If the DB contians a user with the given id
    foreach ($data as $key => $value) { // loop through the supplied parameters
      $users->$id->$key = $value; // set the parameter on the user object equal to the value from the request
    }
    updateData('users', $users); // save the users array in the file
    $response->getBody()->write('{"message": "The user was successfully updated!"}'); // Set success message
    return $response; // Return the response
  }

  $response = $response->withStatus(404);
  $response->getBody()->write('{"message": "No user with the given id was found!"}');

  return $response;
});

// Delete user by id
$app->delete('/users/{id}', function (Request $request, Response $response, array $args) {
  $id = $args['id'];
  if(deleteData('users', $id)){
    $response->getBody()->write('{"message": "The user was deleted!"}');
    return $response;
  }
  $response = $response->withStatus(404);
  $response->getBody()->write('{"message": "No user with the given id was found!"}');
  return $response;
});