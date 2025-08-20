<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "devop";

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $action = $_POST['action'] ?? '';
    $usernme = $_POST['username'] ?? '';
    $userpass = $_POST['userpass'] ?? '';

    if ($action === 'register') {
        register($usernme, $userpass);
    } elseif ($action === 'login') {
        login($usernme, $userpass);
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid action"]);
    }
}

function register($user, $pass) {
    global $servername, $username, $password, $dbname;

    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $check = $conn->prepare("SELECT COUNT(*) FROM user WHERE username = :user");
        $check->bindParam(':user', $user);
        $check->execute();
        $exists = $check->fetchColumn();

        if ($exists > 0) {
            echo json_encode(["status" => "error", "message" => "duplicate"]);
            return;
        }

        // Insert new user
        $sql = "INSERT INTO user (username, userpass) VALUES (:user, :pass)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':user', $user);
        $stmt->bindParam(':pass', $pass);
        $stmt->execute();

        echo json_encode(["status" => "success", "message" => "User registered"]);
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }

    $conn = null;
}