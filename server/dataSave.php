<?php
require_once('./db_config.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST' && empty($_POST))
    $_POST = json_decode(file_get_contents('php://input'), true);

$userId = $_POST['userId'] ;
$workspaces = $_POST['workspaces'];


if ($userId == "" || $userId == null){
    $res = array(
        'status' => ERREUR,
        'message' => "Problème de paramètres de sauvegarde",
        'login' => $login,
        'password' => $password
    );

    echo json_encode($res);
    exit(1);
}

try {
    $DB = new PDO('mysql:host=' . $db_host . ';dbname=' . $db_name, $db_user, $db_password);

    $sql = "SELECT * FROM user WHERE id='".$userId."'";
    $req = $DB->query($sql);
    $userOk = false;
    while($user = $req->fetch()) {
        $userOk = true;
    }
    if (!$userOk){
        $res = array(
            'status' => ERREUR,
            'message' => "Id utilisateur inconnu",
        );
        echo json_encode($res);
        exit(1);
    }

    // Suppression des workspaces de l'utilisateur
    $sql = "delete FROM workspace WHERE user_id='".$userId."'";
    $res_exec = $DB->exec($sql);
    echo "\n";

    for($i = 0; $i < count($workspaces); $i++){
        $workspace = $workspaces[$i];
        $sql = "INSERT INTO workspace(user_id, title, position, nb_column, background_color) VALUES('".$userId."', '".$workspace['title']."', '".$i."', '".$workspace['nb_column']."', '".$workspace['bgColor']."')";
        echo "Sql : ".$sql."\n";
        $res_exec = $DB->exec($sql);

        $sql = "SELECT LAST_INSERT_ID()";
        $req = $DB->query($sql);
        $workspaceId = $req->fetch()[0];

        for ($colIndex = 0; $colIndex < count($workspace['widgets']); $colIndex++){
            $column = $workspace['widgets'][$colIndex];
            for ($posIndex = 0; $posIndex < count($column); $posIndex++){
                $widget = $column[$posIndex];
                echo "\n Widget : \n";
                var_dump($widget);
                echo "\n";

                $sql = "INSERT INTO widget(workspace_id,title,col,position,type_widget) VALUES('".$workspaceId."', '".$widget['name']."', '".$colIndex."', '".$posIndex."', '".$widget['type_widget']."')";
                echo "Sql : ".$sql."\n";
                $res_exec = $DB->exec($sql);
                if ($res_exec == 0) {
                    var_dump($DB->errorInfo());
                } else {                    
                    $sql = "SELECT LAST_INSERT_ID()";
                    $req = $DB->query($sql);
                    $widgetId = $req->fetch()[0];

                    $params = $widget['params'];
                    var_dump($params);
                    foreach ($params as $key => $value){
                        $sql = "INSERT INTO widget_params(widget_id,field_name,value) VALUES('".$widgetId."', '".$key."', '".$value."')";
                        echo "Sql : ".$sql."\n";
                        $res_exec = $DB->exec($sql);
                        if ($res_exec == 0) {
                            var_dump($DB->errorInfo());
                        } else { }
                    }
                }   
            }
        }

    }

    /*$sql = "INSERT INTO user(login, password) VALUES('".$login."', '".$password."')";
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
        $sql = "SELECT * FROM user WHERE login='".$login."'";

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
    }*/
} catch(PDOException $e){
    $res = array(
        'status' => ERREUR,
        'message' => "Problème de connexion à la BD",
    );

    echo json_encode($res);
    exit(1);
}

function deleteEverythingFromUser($userId){

}


?>
