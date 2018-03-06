<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

session_start();

require '../vendor/autoload.php';
require_once '../src/data.php';
require_once '../src/validation.php';

$app = new \Slim\App;

$app->get('/hello/{name}', function (Request $request, Response $response, array $args) {
  $name = $args['name'];
  $response->getBody()->write("Hello, $name");
  return $response;
});

require_once '../src/routes/users.php';
require_once '../src/routes/auth.php';

$app->run();

