<?php
require_once('./db_config.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST' && empty($_POST))
    $_POST = json_decode(file_get_contents('php://input'), true);

// on récupère les paramètres
$login = $_POST['login'] ;
$password = $_POST['password'] ;


if ($login == "" || $password == ""){
    $res = array(
        'status' => ERREUR,
        'message' => "Problème de paramètres d'inscription",
        'login' => $login,
        'password' => $password,
    );

    echo json_encode($res);
    exit(1);
}

try {
    $DB = new PDO('mysql:host=' . $db_host . ';dbname=' . $db_name, $db_user, $db_password);

    $sql = "SELECT * FROM user WHERE login='".$login."'";

    $req = $DB->query($sql);

    while($user = $req->fetch()) {
        if ($user['password'] == $password){
            $ret = array(
                'status' => OK,
                'message' => "Connexion réussie.",
                "user" => $user
            );
            echo json_encode($ret);
            exit;
        } else {
            $res = array(
                'status' => ERREUR,
                'message' => "Mauvais mot de pase",
            );
            echo json_encode($res);
            exit(1);
        }
    }
} catch(PDOException $e){
    $res = array(
        'status' => ERREUR,
        'message' => "Problème de connexion à la BD",
    );

    echo json_encode($res);
    exit(1);
}

$res = array(
    'status' => ERREUR,
    'message' => "Mauvais nom d'utilisateur",
);
echo json_encode($res);
exit(1);



?>
