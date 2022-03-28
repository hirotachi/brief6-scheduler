<?php


use App\Core\Request;
use App\Core\Route;
use App\Kernel;


require __DIR__.'/../vendor/autoload.php';


// setup routing files
$routingFiles = ["web" => "/", "api" => "/api"];
foreach ($routingFiles as $routingFile => $routeGroup) {
    $path = dirname(__DIR__)."/routes/$routingFile.php";
    if (file_exists($path)) {
        Route::group($routeGroup, function () use ($path) {
            require_once $path;
        });
    }
}


$kernel = new Kernel();

$response = $kernel->handle(Request::capture());
$response?->send();



