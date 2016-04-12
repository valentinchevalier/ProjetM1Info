<?php
require_once('./db_config.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST' && empty($_POST))
    $_POST = json_decode(file_get_contents('php://input'), true);

$userId = $_POST['userId'] ;


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

    // selection des workspaces de l'utilisateur
    $statementWorkspace = $DB->prepare("SELECT * FROM workspace WHERE user_id=:user_id ORDER BY position asc");
    $statementWorkspace->bindParam('user_id', $userId);     
    $res_exec = $statementWorkspace->execute();
    if ($res_exec == 0) {
        echo "\nErreur de la BD : ";
        var_dump($DB->errorInfo());
    }

    $res = array();
    while($workspace = $statementWorkspace->fetch(PDO::FETCH_ASSOC)) {
        // Remplissage du tableau widgets selon le nombre de colonnes
        $workspace['widgets'] = array();

        $statementWidget = $DB->prepare("SELECT * FROM widget WHERE workspace_id= :workspace_id ORDER BY position asc");
        $statementWidget->bindParam('workspace_id', $workspace['id']);

        $res_exec = $statementWidget->execute();
        if ($res_exec == 0) {
            echo "\nErreur de la BD : ";
            var_dump($statementWidget->errorInfo());
        }

        while($widget = $statementWidget->fetch(PDO::FETCH_ASSOC)) {
            $statementWidgetParams = $DB->prepare("SELECT * FROM widget_params WHERE widget_id= :widget_id");
            $statementWidgetParams->bindParam('widget_id', $widget['id']);

            $res_exec = $statementWidgetParams->execute();
            if ($res_exec == 0) {
                echo "\nErreur de la BD : ";
                var_dump($statementWidgetParams->errorInfo());
            }
            $widget['params'] = array();
            while($widgetParam = $statementWidgetParams->fetch(PDO::FETCH_ASSOC)) {
                $widget['params'][$widgetParam['field_name']] = $widgetParam['value'];
            }
            array_push($workspace['widgets'], $widget);
        }

        
        array_push($res, $workspace);
    }
    echo json_encode($res);
} catch(PDOException $e){
    $res = array(
        'status' => ERREUR,
        'message' => "Problème de connexion à la BD",
    );

    echo json_encode($res);
    exit(1);
}


?>
