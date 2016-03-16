<?php

// on récupère les paramètres
$login = $_GET['param1'] ;
$mdp = $_GET['param2'] ;
$confirm_mdp = $_GET['param3'] ;

// connexion à la bdd
$db = mysql_connect('db614567606.db.1and1.com', 'dbo614567606', 'ProjetM1Info');  

// selection de la bdd
mysql_select_db('db614567606',$db); 

//test sur confirmation du mot de passe
if ($mdp==$confirm_mdp){
	// on crée la requete SQL
	$sql= "INSERT INTO user(login, password) VALUES('".$login."', '".$mdp."')";
	// on envoie la requête
	$req = mysql_query($sql) or die('Erreur SQL !<br>'.$sql.'<br>'.mysql_error()); 
	echo("ok");
}
else {
	echo("incorrect");
}

// on ferme la connexion à mysql
mysql_close(); 

?>