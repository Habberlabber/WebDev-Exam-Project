<?
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

// 
$app->get('/bookmark/', function (Request $request, Response $response, array $args) {
  $marks = getData("marks");
  unset($marks->primary_key);

  $users = getData("users");
  unset($users->primary_key);

  //$id = $_SESSION['user'];
  $id = 1;
  $resArray = [];
  foreach ($marks as $key => $mark) {
    if($mark->marker_id == $id){
      $userId = $mark->marked_id;
      array_push($resArray, $users->$userId);
    }
  }

  $response->getBody()->write(json_encode($resArray));
  return $response;
});

$app->post('/bookmark/{marked_id}', function (Request $request, Response $response, array $args){
  $data = $request->getParsedBody();
  $marked_id = $args['marked_id'];
  $marks = getData("marks");
  unset($marks->primary_key);

  //$id = $_SESSION['user'];
  $id = 1;

  foreach($marks as $key => $mark){
    if($mark->marker_id == $id && $mark->marked_id == $marked_id){
      $response->getBody()->write('{"message": "The bookmark already exists!"}');
      return $response;
    }
  }

  $markObj = new stdClass();
  $markObj->marker_id = $id;
  $markObj->marked_id = $marked_id;

  addData('marks', $markObj, true);
  $response->getBody()->write('{"message": "The bookmark was saved!"}');
  return $response;
});