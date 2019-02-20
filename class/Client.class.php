<?php
class Client{
    private $clientId;
    private $clientRaisonSocial;
    private $adresseId;

	public function __construct($valeurs = array()){
		if (!empty($valeurs))

				$this->affecte($valeurs);
    }

    public function affecte($donnees){
        foreach ($donnees as $attribut => $valeur){
                switch ($attribut){
                    case 'CLIENT_ID': $this->setClientId($valeur); break;
                    case 'CLIENT_RAISON_SOCIAL' : $this->setClientRaisonSocial($valeur); break;
                    case 'ADRESSE_ID': $this->setAdresseId($valeur); break;
                }
        }
    }

    public function getClientId() {
        return $this->$clientId;
    }

    public function getClientRaisonSocial() {
        return $this->$clientRaisonSocial;
    }

    public function getAdresseId() {
        return $this->$adresseId;
    }

    public function setClientId($id) {
        $this->clientId = $id;
    }

    public function setClientRaisonSocial($rs) {
        $this->clientRaisonSocial = $rs;
    }

    public function setAdresseId($ad) {
        $this->adresseId = $ad;
    }
}