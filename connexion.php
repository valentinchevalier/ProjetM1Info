<?php

//desactivation car erreurs 
ini_set('display_errors','off');

// on r�cup�re les param�tres
$login = $_GET['param1'] ;
$mdp = $_GET['param2'] ;

// connexion � la bdd
$db = mysql_connect('db614567606.db.1and1.com', 'dbo614567606', 'ProjetM1Info'); 

// selection de la bdd
mysql_select_db('db614567606',$db); 

// creation de la requ�te SQL
$sql = "SELECT login, password FROM user WHERE login='".$login."' AND password='".$mdp."' "; 

// on envoie la requ�te
$req = mysql_query($sql) or die('Erreur SQL !<br>'.$sql.'<br>'.mysql_error()); 

// on fait une boucle qui va faire un tour pour chaque enregistrement
while($data = mysql_fetch_array($req)) 
{    
	// on affiche les informations de l'enregistrement en cours
	if ($data['login']==$login && $data['password']==$mdp ){
	
		//on renvoie ok
		echo ("ok");
	}
	else {
		//on renvoie incorrect
		echo ("incorrect");
	}
} 

// on ferme la connexion � mysql
mysql_close(); 



?>