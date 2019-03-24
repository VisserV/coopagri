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
     public function selectItineraire($id){
          $ad = array();

          $req = $this->db->prepare("SELECT a.ADRESSE_ID, ADRESSE_RUE_NUM, ADRESSE_RUE_LIBELLE, ADRESSE_CP, ADRESSE_VILLE
           FROM adresse a, itineraire i WHERE a.ADRESSE_ID = i.ADRESSE_ID 
           AND i.ITINERAIRE_ID = $id ORDER BY ITINERAIRE_HEURE_PASSAGE");

          $req -> execute();

          while ($donnees = $req->fetch(PDO::FETCH_OBJ)) {
               $ad[] = $donnees;
          }

          $req->closeCursor();
          
          echo json_encode($ad);
     }
}
?>
