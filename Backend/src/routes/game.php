<?
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

// 
$app->get('/game/', function (Request $request, Response $response, array $args) {

  $users = getData("users");
  unset($users->primary_key);

  $votes = getData("votes");
  unset($votes->primary_key);

  $marks = getData("marks");
  unset($marks->primary_key);


  //$currentUser = $_SESSION['user'];
  $id = 1;
  $currentUser = $users->$id;
  $id = $currentUser->id;
  unset($users->$id);
  $usersArr = (array)$users;
  shuffle($usersArr);
  foreach ($usersArr as $key => $user) {
    if($user->gender == $currentUser->preference && !empty($user->images) && $user->user_type != 0){
      $isVoted = false;

      foreach ($marks as $key => $mark) {
        if($mark->marker_id == $currentUser->id && $mark->marked_id == $user->id){
          $isVoted = true;
        }
      }

      foreach ($votes as $key => $vote) {
        if($vote->voter_id == $currentUser->id && $vote->voted_id == $user->id){
          $isVoted = true;
        }
      }

      if(!$isVoted){
        $response->getBody()->write(json_encode($user));
        return $response;
      }
    }
  }

  $response = $response->withStatus(404);
  $response->getBody()->write('{"message":"No users available!"}');
  return $response;
});

$app->post('/game/{voted_id}', function (Request $request, Response $response, array $args){
  $data = $request->getParsedBody();
  $voted_id = $args['voted_id'];
  $vote = $data['vote'];

  $votes = getData("votes");
  unset($votes->primary_key);

  //$id = $_SESSION['user'];
  $id = 1;

  $marks = getData('marks');

  foreach ($marks as $key => $mark) {
    if($key != 'primary_key'){
      if($mark->marker_id == $id && $mark->marked_id == $voted_id){
        unset($marks->$key);
        updateData('marks', $marks);
        break;
      }
    }
  }


  $voteObj = new stdClass();
  $voteObj->voter_id = $id;
  $voteObj->voted_id = $voted_id;
  $voteObj->vote = $vote;

  foreach ($votes as $key => $v) {
    if($v->voter_id == $voteObj->voted_id && $v->voted_id == $voteObj->voter_id){

      $notiObj = new stdClass();
      $notiObj->from = $voted_id;
      $notiObj->to = $id;
      $notiObj->message = "Yay! You have a match!! Check your conversations!";
      $notiObj->date = date("d-m-Y H:i:s");

      $notiObj2 = $notiObj;
      $notiObj2->from = $id;
      $notiObj2->to = $voted_id;

      $chatObj = new stdClass();
      $chatObj->users =  [$id,$voted_id];
      $chatObj->match_date = date("d-m-Y H:i:s");

      addData('chat', $chatObj, true);
      addData('notifications', $notiObj, true);
      addData('notifications', $notiObj2, true);

    }
  }

  $notiObj = new stdClass();
  $notiObj->from = $id;
  $notiObj->to = $voted_id;
  $notiObj->message = $vote == 1 ? "Someone liked you!" : "Someone disliked you!";
  $notiObj->date = date("d-m-Y H:i:s");

  addData('notifications', $notiObj, true);
  addData('votes', $voteObj, true);
  $response->getBody()->write('{"message": "The vote saved!"}');
  return $response;
});