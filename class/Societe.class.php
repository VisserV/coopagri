<?php
class Societe{
    private $societe_id;
    private $societe_raison_sociale;
    private $compte_id;
    private $adresse_id;

	public function __construct($valeurs = array()){
		if (!empty($valeurs))

				$this->affecte($valeurs);
    }

    public function affecte($donnees){
        foreach ($donnees as $attribut => $valeur){
                switch ($attribut){
                    case 'SOCIETE_ID': $this->setSociete_id($valeur); break;
                    case 'SOCIETE_RAISON_SOCIALE' : $this->setSociete_raison_sociale($valeur); break;
                    case 'COMPTE_ID': $this->setCompte_id($valeur); break;
                    case 'ADRESSE_ID' : $this->setAdresse_id($valeur); break;
                }
        }
    }

    public function setSociete_id($id) {
        $this->societe_id = $id;
    }

    public function setSociete_raison_sociale($rais) {
        $this->societe_raison_sociale = $rais;
    }

    public function setSociete_id($cid) {
        $this->compte_id = $cid;
    }

    public function setAdresse_id($aid) {
        $this->adresse_id = $aid;
    }

    public function getSociete_id() {
        return $this->$societe_id;
    }

    public function getSociete_raison_sociale() {
        return $this->$societe_raison_sociale;
    }

    public function getCompte_id() {
        return $this->$compte_id;
    }

    public function getAdresse_id() {
        return $this->$adresse_id;
    }
}
?>