<?php
class Client{

    private $compte_id;
    private $compte_login;
    private $compte_pass;

    public function __construct($valeurs = array()){
		if (!empty($valeurs))

				$this->affecte($valeurs);
    }

    public function affecte($donnees){
        foreach ($donnees as $attribut => $valeur){
            switch ($attribut){
                case 'COMPTE_ID': $this->SetCompte_id($valeur); break;
                case 'COMPTE_LOGIN': $this->SetCompte_login($valeur); break;
                case 'COMPTE_PASS': $this->SetCompte_pass($valeur); break;
            }
        }
    }

    public function SetCompte_id($id) {
        $this->compte_id = $id;
    }

    public function SetCompte_login($log) {
        $this->compte_id = $log;
    }

    public function SetCompte_pass($pwd) {
        $this->compte_id = $pwd;
    }

    public function GetCompte_id() {
        return $this->compte_id;
    }

    public function GetCompte_login() {
        return $this->compte_login;
    }

    public function GetCompte_pass() {
        return $this->compte_pass;
    }
}
?>