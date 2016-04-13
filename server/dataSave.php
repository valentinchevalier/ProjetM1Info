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
        'user-id' => $userId,
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
        $statement = $DB->prepare("INSERT INTO workspace(user_id, title, position, nb_column, background_color) VALUES(:user_id, :title, :position, :nb_column, :background_color)");
        $statement->bindParam('user_id', $userId, PDO::PARAM_INT);
        $statement->bindParam('title', $workspace['title']);
        $statement->bindParam('position', $i, PDO::PARAM_INT);
        $statement->bindParam('nb_column', $workspace['nb_column'], PDO::PARAM_INT);
        $statement->bindParam('background_color', $workspace['bgColor']);

        $res_exec = $statement->execute();

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
                $statement = $DB->prepare("INSERT INTO widget(workspace_id,title,col,position,type_widget) VALUES(:workspace_id,:title,:col,:position,:type_widget)");
                $statement->bindParam('workspace_id', $workspaceId, PDO::PARAM_INT);
                $statement->bindParam('title', $widget['name']);
                $statement->bindParam('col', $colIndex, PDO::PARAM_INT);
                $statement->bindParam('position', $posIndex, PDO::PARAM_INT);
                $statement->bindParam('type_widget', $widget['type_widget']);

                $res_exec = $statement->execute();

                if ($res_exec == 0) {
                    var_dump($DB->errorInfo());
                } else {
                    $sql = "SELECT LAST_INSERT_ID()";
                    $req = $DB->query($sql);
                    $widgetId = $req->fetch()[0];

                    $params = $widget['params'];
                    var_dump($params);
                    foreach ($params as $key => $value){
                        $id = 0;
                        $nom = 'Test_';

                        $statement = $DB->prepare("INSERT INTO widget_params(widget_id,field_name,value) VALUES(:widget_id, :field_name, :value)");
                        $statement->bindParam('widget_id', $widgetId, PDO::PARAM_INT);
                        $statement->bindParam('field_name', $key);
                        $statement->bindParam('value', $value);

                        $res_exec = $statement->execute();

                        if ($res_exec == 0) {
                            var_dump($DB->errorInfo());
                        } else {

                        }
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
