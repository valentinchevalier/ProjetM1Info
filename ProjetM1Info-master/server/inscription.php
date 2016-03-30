<?php
require_once('./db_config.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST' && empty($_POST))
    $_POST = json_decode(file_get_contents('php://input'), true);

$login = $_POST['login'] ;
$password = $_POST['password'] ;

if ($login == "" || $password == ""){
    $res = array(
        'status' => ERREUR,
        'message' => "Problème de paramètres d'inscription",
        'login' => $login,
        'password' => $password
    );

    echo json_encode($res);
    exit(1);
}

try {
    $DB = new PDO('mysql:host=' . $db_host . ';dbname=' . $db_name, $db_user, $db_password);

    $sql = "SELECT login, password FROM user WHERE login='".$login."'";

    $req = $DB->query($sql);
    while($user = $req->fetch()) {
        $ret = array(
            'status' => ERREUR,
            'message' => "Nom d'utilisateur déja utilisé",
        );
        echo json_encode($ret);
        exit;
    }

    $sql = "INSERT INTO user(login, password) VALUES('".$login."', '".$password."')";
    $res_exec = $DB->exec($sql);
    if ($res_exec == 0) {
        $res = array(
            'status' => ERREUR,
            'message' => "Nom d'utilisateur déja utilisé",
        );
        echo json_encode($res);
        exit(1);
    } else {
        // récuperation de l'utilisateur crée
        $sql = "SELECT login, password FROM user WHERE login='".$login."'";

        $req = $DB->query($sql);
        while($user = $req->fetch()) {
            $ret = array(
                'status' => OK,
                'message' => "Création réussie.",
                "user" => $user
            );
            echo json_encode($ret);
            exit;
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



?>
