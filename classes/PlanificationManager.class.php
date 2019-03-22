<?php
class PlanificationManager{
     public function __construct($db){
          $this->db = $db;
     }

     public function addItineraire($ID, $ADRESSE_ID, $ITINERAIRE_HEURE_PASSAGE){
          $req = $this->db->prepare("INSERT INTO itineraire(ITINERAIRE_ID, ADRESSE_ID, ITINERAIRE_HEURE_PASSAGE) VALUES ('$ID','$ADRESSE_ID', '$ITINERAIRE_HEURE_PASSAGE')");
		$req -> execute();
     }
     public function updateItineraire($ADRESSE_ID, $ITINERAIRE_HEURE_PASSAGE){
          $req = $this->db->prepare("UPDATE itineraire SET(ITINERAIRE_HEURE_PASSAGE) VALUES ('$ITINERAIRE_HEURE_PASSAGE') WHERE ADRESSE_ID=$ADRESSE_ID");
		$req -> execute();
     }
}
?>
