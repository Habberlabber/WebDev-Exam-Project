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

require_once '../src/mail.php';

// Create user
$app->post('/users/', function (Request $request, Response $response) {
  $data = $request->getParsedBody();
  $users = getData('users');
  $userObj = json_decode(json_encode($data)); // convert data form Array to JSON object
  $userObj->creation_date = $today = date("Y-m-d"); // Set the creation_date
  $userObj->user_type = !empty($userObj->user_type) ?: 0; // If no usertype is defined set to default
  if(validateUserObject($userObj, true)){
    addData('users', $userObj, true);
    $id = $users->primary_key +1;
    sendMail($userObj->email, "http://localhost/WebDev-Exam-Project/Backend/API/activate/$id");
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

$app->get('/activate/{id}', function (Request $request, Response $response, array $args) {
  $users = getData('users');
  $id = $args['id'];
  if($users->$id->user_type == 0){
    $users->$id->user_type = 1;
    updateData('users', $users);
    $response->getBody()->write("You are now active!!");
    return $response;
  }

  $response->getBody()->write("This link is no longer useable!!");
  return $response;
});

// Update user by ID
$app->put('/users/{id}', function(Request $request, Response $response){
  $id = $request->getAttribute('id'); // Get the id from the url

  //$id = $id == "me" ? $_SESSION['user']->id : $id; // If the id given is "me" get the id of the online user
  $id = $id == "me" ? 1 : $id; // If the id given is "me" get the id of the online user

  $data = $request->getParsedBody(); // Get the data from the request
  $users = getData('users'); // Get all users form the Database
  if(!empty($users->$id)) { // If the DB contians a user with the given id
    foreach ($data as $key => $value) { // loop through the supplied parameters
      if($key != "password" && $key != "confirmPassword"){
        $users->$id->$key = $value; // set the parameter on the user object equal to the value from the request
      } elseif($key == "password" ) {
        if($value == $data['confirmPassword'])
          $users->$id->$key = $value; // set the parameter on the user object equal to the value from the request
        else {
          $response = $response->withStatus(400);
          $response->getBody()->write('{"message": "The passwords was not identical!"}');
          return $response;
        }
      }
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


// Add image
$app->post('/users/image', function (Request $request, Response $response) {
  $directory = '../src/images/';
  $uploadedFiles = $request->getUploadedFiles();

  // if(empty($_SESSION['user'])){
  //   $response = $response->withStatus(403);
  //   $response->getBody()->write('{"message": "The user is not logged in!"}');
  //   return $response;
  // }

  //$id = $_SESSION['user']->id;
  $id = 1;

  $uploadedFile = $uploadedFiles['img'];
  if($uploadedFile->getError() === UPLOAD_ERR_OK) {
    $basename = bin2hex(random_bytes(16));  // Generate unique name
    $extension = pathinfo($uploadedFile->getClientFilename(), PATHINFO_EXTENSION); // get file-extension
    $newFilename = sprintf('%s.%0.8s', $basename, $extension); // Create new filename
    $path = $directory.$newFilename; // Generate path string
    $uploadedFile->moveTo($path); // Move file form temp to images location

    $users = getData('users'); // Get all users form the Database
    if(!empty($users->$id)) { 
      $users->$id->images = !empty($users->$id->images) ? $users->$id->images : [];
      array_push($users->$id->images, $newFilename);
      updateData('users', $users);
    }

    $response->write("Success??"); // Respond
  }

  return $response;
});