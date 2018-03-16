<?
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->get('/chat/', function (Request $request, Response $response, array $args) {
  $chats = getData('chat');
  unset($chats->primary_key);

  $users = getData('users');

  //$id = $_SESSION['user']->id;
  $id = 1;

  $returnArray = [];

  foreach ($chats as $key => $chat) {
    if(in_array($id, $chat->users)){
      foreach ($chat->users as $key => $u) {
        if($u != $id)
          $chat->user = $users->$u;
      }
      array_push($returnArray, $chat);
    }
  }

  $response->getBody()->write(json_encode($returnArray));
  return $response;
});

$app->get('/chat/{chat_id}', function (Request $request, Response $response, array $args) {
  $messages = getData('messages');
  unset($messages->primary_key);

  $users = getData('users');

  $chat_id = $args['chat_id'];

  //$id = $_SESSION['user']->id;
  $id = 1;

  $returnArray = [];

  foreach ($messages as $key => $m) {
    if($m->chat_id == $chat_id){
      $sender = $m->sender_id;
      $m->user = $users->$sender;
      array_push($returnArray, $m);
    }
  }
  $response->getBody()->write(json_encode(array_reverse($returnArray)));
  return $response;
});

$app->post('/chat/{chat_id}', function (Request $request, Response $response, array $args) {
  $chat_id = $args['chat_id'];
  $data = $request->getParsedBody();
  $message = $data['message'];

  //$id = $_SESSION['user']->id;
  $id = 1;

  $chats = getData('chat');
  $recp_id = $chats->$chat_id->users[0] == $id? $chats->$chat_id->users[1] : $chats->$chat_id->users[0];

  $users = getData('users');
  $sender_name = $users->$id->first_name .' '. $users->$id->last_name;

  $msgObj = new stdClass();
  $msgObj->chat_id = $chat_id;
  $msgObj->sender_id = $id;
  $msgObj->date_time = date("d-m-Y H:i:s");;
  $msgObj->message = $message;

  $notiObj = new stdClass();
  $notiObj->from = $id;
  $notiObj->to = $recp_id;
  $notiObj->message = "New message from $sender_name!";
  $notiObj->date = date("d-m-Y H:i:s");

  addData('messages', $msgObj, true);
  addData('notifications', $notiObj, true);

  $response->getBody()->write('{"message": "The message was sendt!"}');
  return $response;
});