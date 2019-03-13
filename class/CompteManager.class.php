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
}