<?php

class CompteManager {
    private $db;

    public function __construct($db){
        $this->db = $db;
    }

    public function add($compte) {
        $sql = 'INSERT INTO compte (COMPTE_LOGIN, COMPTE_PASS) VALUES (:log, :pass);';
        $requete = $this->db->prepare($sql);

        $requete->bindValue(':log', $compte->GetCompte_login());
        $requete->bindValue(':pass', $compte->GetCompte_pass());

        $retour = $requete->execute();

        return $retour;
    }

    public function GetCompte_from_login($log){
        $sql = 'SELECT * FROM compte WHERE COMPTE_LOGIN = :log';
        $requete = $this->db->prepare($sql);

        $requete->bindValue(':log',$log);
        $retour = $requete->execute();

        $compte = $requete->fetch(PDO::FETCH_OBJ);
        $cpt = new Compte($compte);

        return $cpt;
    }

    public function IsAdmin($id) {
        $sql = 'SELECT CATEGORIE_PER_ADMIN FROM compte JOIN personnel ON compte.COMPTE_ID = personnel.COMPTE_ID JOIN categorieper ON personnel.CATEGORIE_PER_ID = categorieper.CATEGORIE_PER_ID WHERE compte.COMPTE_ID = :id';
        $requete = $this->db->prepare($sql);

        $requete->bindValue(':id',$id);
        $retour = $requete->execute();

        $resultat = $requete->fetch(PDO::FETCH_OBJ);

        if(isset($resultat->CATEGORIE_PER_LIVREUR)) {
            return $resultat->CATEGORIE_PER_ADMIN == 1;
        } else {
            return null;
        }
        
    }
    

    public function IsLivreur($id) {
            $sql = 'SELECT CATEGORIE_PER_LIVREUR FROM compte JOIN personnel ON compte.COMPTE_ID = personnel.COMPTE_ID JOIN categorieper ON personnel.CATEGORIE_PER_ID = categorieper.CATEGORIE_PER_ID WHERE compte.COMPTE_ID = :id';
            $requete = $this->db->prepare($sql);
    
            $requete->bindValue(':id',$id);
            $retour = $requete->execute();
    
            $resultat = $requete->fetch(PDO::FETCH_OBJ);

            if(isset($resultat->CATEGORIE_PER_LIVREUR)) {
                return $resultat->CATEGORIE_PER_LIVREUR == 1;
            } else {
                return null;
            }
    }
    
}