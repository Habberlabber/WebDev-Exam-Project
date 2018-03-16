<? 
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->get('/notifications/', function (Request $request, Response $response, array $args) {
  $nots = getData('notifications');

  //$id = $_SESSION['user']->id;
  $id = 1;
  $notArray = [];
  foreach ($nots as $key => $not) {
    if($key != 'primary_key'){
      if($not->to == $id){
       array_push($notArray, $not);
        unset($nots->$key);
      }
    }
  }
  updateData('notifications', $nots);

  $response->getBody()->write(json_encode($notArray));
  return $response;
});