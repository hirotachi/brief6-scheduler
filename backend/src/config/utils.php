<?php


use App\Core\RedirectResponse;
use App\Core\Request;
use Dotenv\Dotenv;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Symfony\Component\HttpFoundation\Response;


function redirect(string $path = "")
{
    $redirectResponse = new RedirectResponse($path === "" ? "/" : $path);
    return $path === "" ? $redirectResponse : $redirectResponse->getResponse();
}

function response(string|array $content = "", int $status = Response::HTTP_OK, array $headers = []): Response
{
    if (is_array($content)) {
        $content = json_encode($content);
        return new Response($content, $status, ["content-type" => "application/json", ...$headers]);
    }
    return new Response($content, $status, $headers);
}


function loadEnv($envName, $default = "")
{
    $dotenv = Dotenv::createImmutable(dirname(__DIR__));
    $dotenv->load();
    return $_ENV[$envName] ?? $default;
}

function startSession()
{
    if (!isset($_SESSION)) {
        session_start();
    }
}

function destroySession()
{
    startSession();
    if (isset($_SESSION)) {
        session_destroy();
        $_SESSION = null;
    }
}

function verifyArrayKeys($requiredKeys, $arr): bool|array
{
    $notFilled = [];
    foreach ($requiredKeys as $req) {
        if (!isset($arr[$req])) {
            $notFilled[] = $req;
        }
    }
    return count($notFilled) > 0 ? $notFilled : false;
}


function generateToken(object $user): string
{
    $payload = [
        "userId" => $user->id,
        "key" => $user->authKey,
        "iat" => (new DateTime())->getTimestamp()
    ];
    return JWT::encode($payload, config()->jwtSecret, 'HS256');
}


function verifyAuthToken(Request $req)
{
    $authToken = $req->headers->get("authorization");
    if (!$authToken) {
        return;
    }
    $arr = preg_split("/\s+/", $authToken);
    $token = $arr[1];
    try {
        $payload = JWT::decode($token, new Key(config()->jwtSecret, "HS256"));
        $req->attributes->set("key", $payload->key);
        $req->attributes->set("userId", $payload->userId);
    } catch (Exception $e) {
    }
}