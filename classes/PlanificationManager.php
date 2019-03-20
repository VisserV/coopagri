<?php
class PlanificationManager{
     public function __construct($db){
          this->db = $db;
     }

     public function addItinairaire($ADRESSE_ID, $ITINERAIRE_HEURE_PASSAGE){
          $req = $this->db->prepare(
			"INSERT INTO itineraire(ADRESSE_ID, ITINERAIRE_HEURE_PASSAGE) VALUES ('$ADRESSE_ID', '$ITINERAIRE_HEURE_PASSAGE'')";
		$req -> execute();
     }
}
 ?>
