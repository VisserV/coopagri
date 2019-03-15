<?php
/**
 * Created by PhpStorm.
 * User: Aurélien
 * Date: 15/03/2019
 * Time: 12:38
 */

class CommandeManager
{

    private $dbo;

    public function __construct($dbo){
        $this->dbo=$dbo;
    }

    public function getPrixParMoisEtFournisseur(){

        $sql = 'SELECT SOCIETE_RAISON_SOCIAL, PrixParMois, TypeDeProduit,
                CASE
                    WHEN MOIS = 1 THEN \'JANVIER\'
                    WHEN MOIS = 2 THEN \'FEVRIER\'
                    WHEN MOIS = 3 THEN \'MARS\'
                    WHEN MOIS = 4 THEN \'AVRIL\'
                    WHEN MOIS = 5 THEN \'MAI\'
                    WHEN MOIS = 6 THEN \'JUIN\'
                    WHEN MOIS = 7 THEN \'JUILLET\'
                    WHEN MOIS = 8 THEN \'AOUT\'
                    WHEN MOIS = 9 THEN \'SEPTEMBRE\'
                    WHEN MOIS = 10 THEN \'OCTOBRE\'
                    WHEN MOIS = 11 THEN \'DECEMBRE\'
                    else \'DECEMBRE\'
                END AS MOIS    
                FROM (SELECT p.PRODUIT_LIBELLE as TypeDeProduit, s.SOCIETE_RAISON_SOCIAL, SUM(p.PRODUIT_PRIX_VENTE * l.LIGNE_QUANTITE) as PrixParMois, MONTH(c.COMMANDE_DATE_CREATION) as MOIS
                FROM commande c JOIN ligne l ON c.COMMANDE_ID = l.COMMANDE_ID JOIN produit p ON l.PRODUIT_ID = P.PRODUIT_ID JOIN fournisseur f ON p.FOURNISSEUR_ID = f.FOURNISSEUR_ID JOIN societe s ON f.SOCIETE_ID = s.SOCIETE_ID GROUP BY TypeDeProduit, MOIS, SOCIETE_RAISON_SOCIAL)T1 
                GROUP BY TypeDeProduit, MOIS, SOCIETE_RAISON_SOCIAL';

        $requete = $this->dbo->prepare($sql);
        $requete->execute();
        $resultat = $requete->fetch(PDO::FETCH_OBJ);
        $requete->closeCursor();
        return json_encode($resultat);
    }
}